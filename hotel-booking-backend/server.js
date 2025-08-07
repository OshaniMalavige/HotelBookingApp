const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/hotel_booking');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

// Booking Schema
const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    roomType: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    timeFormat: {
        type: String,
        required: true,
        enum: ['AM', 'PM']
    },
    departureDate: {
        type: Date,
        required: true
    },
    freePickup: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    specialRequests: {
        type: String,
        default: ''
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    bookingReference: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

// Generate booking reference
bookingSchema.pre('save', function(next) {
    if (!this.bookingReference) {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        this.bookingReference = `HTL-${timestamp}-${random}`.toUpperCase();
    }
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

// Middleware to process departure date
const processBookingData = (req, res, next) => {
    try {
        const { departureMonth, departureDay, departureYear } = req.body;

        if (departureMonth && departureDay && departureYear) {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const monthIndex = months.indexOf(departureMonth);
            if (monthIndex !== -1) {
                req.body.departureDate = new Date(departureYear, monthIndex, departureDay);
            }
        }

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid date format' });
    }
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Hotel Booking API'
    });
});

app.post('/api/bookings', processBookingData, async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            bookingReference: booking.bookingReference,
            booking: {
                id: booking._id,
                bookingReference: booking.bookingReference,
                firstName: booking.firstName,
                lastName: booking.lastName,
                email: booking.email,
                roomType: booking.roomType,
                guests: booking.guests,
                arrivalDate: booking.arrivalDate,
                departureDate: booking.departureDate,
                bookingStatus: booking.bookingStatus,
                createdAt: booking.createdAt
            }
        });
    } catch (error) {
        console.error('Booking creation error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: messages
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Booking reference already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message
        });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const bookings = await Booking.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Booking.countDocuments();

        res.json({
            success: true,
            bookings,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalBookings: total,
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve bookings',
            error: error.message
        });
    }
});

app.get('/api/bookings/search', async (req, res) => {
    try {
        const { reference, email } = req.query;
        let query = {};

        if (reference) {
            query.bookingReference = reference.toUpperCase();
        } else if (email) {
            query.email = email.toLowerCase();
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please provide either booking reference or email'
            });
        }

        const booking = await Booking.findOne(query);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            booking
        });
    } catch (error) {
        console.error('Search booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search booking',
            error: error.message
        });
    }
});

app.patch('/api/bookings/update-status', async (req, res) => {
    try {
        const { bookingReference, status } = req.body;

        if (!bookingReference || !status) {
            return res.status(400).json({
                success: false,
                message: 'Booking reference and status are required'
            });
        }

        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be: pending, confirmed, or cancelled'
            });
        }

        const booking = await Booking.findOneAndUpdate(
            { bookingReference: bookingReference.toUpperCase() },
            { bookingStatus: status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking status updated successfully',
            booking
        });
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update booking',
            error: error.message
        });
    }
});

app.delete('/api/bookings/delete', async (req, res) => {
    try {
        const { bookingReference } = req.body;

        if (!bookingReference) {
            return res.status(400).json({
                success: false,
                message: 'Booking reference is required'
            });
        }

        const booking = await Booking.findOneAndDelete({
            bookingReference: bookingReference.toUpperCase()
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete booking',
            error: error.message
        });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Visit http://localhost:${PORT}/api/health to test`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;