const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomType: { type: String, required: true, enum: ['Single', 'Double', 'Suite', 'Deluxe'] },
    status: { type: String, default: 'Booked', enum: ['Booked', 'Checked-in', 'Checked-out', 'Cancelled'] },
    paymentStatus: { type: String, default: 'Pending', enum: ['Pending', 'Paid', 'Refunded'] },
    specialRequests: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);