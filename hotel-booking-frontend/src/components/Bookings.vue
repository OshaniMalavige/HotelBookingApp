<template>
  <v-container>
    <!-- Header with Title and Book Now Button -->
    <v-row align="center" class="mb-4">
      <v-col>
        <h1>Hotel Bookings</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="openDialog">
          <v-icon left>mdi-plus</v-icon>
          Book Now
        </v-btn>
      </v-col>
    </v-row>

    <!-- Search Field -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Search bookings..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          clearable
        />
      </v-col>
    </v-row>

    <!-- Booking List with Search and Sort -->
    <v-data-table
      :items="bookings"
      :headers="headers"
      :search="search"
      :sort-by="[{ key: 'guestName', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          size="small"
          color="primary"
          @click="editBooking(item)"
          class="mr-2"
        />
        <v-btn
          icon="mdi-delete"
          size="small"
          color="error"
          @click="deleteBooking(item._id)"
        />
      </template>
    </v-data-table>

    <!-- Booking Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Edit Booking' : 'New Booking' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.guestName"
                    label="Guest Name"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.roomNumber"
                    label="Room Number"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.roomType"
                    :items="['Single', 'Double', 'Suite', 'Deluxe']"
                    label="Room Type"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6" v-if="isEditing">
                  <v-select
                    v-model="form.status"
                    :items="['Booked', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out']"
                    label="Status"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.checkIn"
                    label="Check-In Date"
                    type="date"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.checkOut"
                    label="Check-Out Date"
                    type="date"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6" v-if="isEditing">
                  <v-select
                    v-model="form.paymentStatus"
                    :items="['Pending', 'Paid', 'Partial', 'Refunded']"
                    label="Payment Status"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.specialRequests"
                    label="Special Requests"
                    rows="3"
                    auto-grow
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="saveBooking"
            :disabled="!valid"
            :loading="loading"
          >
            {{ isEditing ? 'Update' : 'Save' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this booking?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="confirmDelete" :loading="loading">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookings: [],
      search: '',
      dialog: false,
      deleteDialog: false,
      valid: false,
      loading: false,
      headers: [
        { title: 'Guest Name', key: 'guestName', sortable: true },
        { title: 'Room Number', key: 'roomNumber', sortable: true },
        { title: 'Room Type', key: 'roomType', sortable: true },
        { title: 'Check-In', key: 'checkIn', sortable: true },
        { title: 'Check-Out', key: 'checkOut', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Payment Status', key: 'paymentStatus', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      form: {
        guestName: '',
        roomNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        status: '',
        paymentStatus: '',
        specialRequests: ''
      },
      defaultForm: {
        guestName: '',
        roomNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        status: 'Booked',
        paymentStatus: 'Pending',
        specialRequests: ''
      },
      editingId: null,
      bookingToDelete: null,
      rules: {
        required: value => !!value || 'Required field'
      }
    }
  },
  computed: {
    isEditing() {
      return !!this.editingId
    }
  },
  methods: {
    async fetchBookings() {
      try {
        this.loading = true
        const res = await axios.get('http://localhost:5000/api/bookings')
        this.bookings = res.data
      } catch (error) {
        console.error('Error fetching bookings:', error)
        // You can add a snackbar notification here
      } finally {
        this.loading = false
      }
    },

    openDialog() {
      this.form = { ...this.defaultForm }
      // Set default values for new bookings
      this.form.status = 'Booked'
      this.form.paymentStatus = 'Pending'
      this.editingId = null
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
      this.form = { ...this.defaultForm }
      this.editingId = null
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
    },

    async saveBooking() {
      if (!this.valid) return

      try {
        this.loading = true

        if (this.isEditing) {
          await axios.put(`http://localhost:5000/api/bookings/${this.editingId}`, this.form)
        } else {
          await axios.post('http://localhost:5000/api/bookings', this.form)
        }

        this.closeDialog()
        await this.fetchBookings()

        // You can add a success snackbar notification here
      } catch (error) {
        console.error('Error saving booking:', error)
        // You can add an error snackbar notification here
      } finally {
        this.loading = false
      }
    },

    editBooking(booking) {
      this.form = { ...booking }
      this.editingId = booking._id
      this.dialog = true
    },

    deleteBooking(id) {
      this.bookingToDelete = id
      this.deleteDialog = true
    },

    async confirmDelete() {
      try {
        this.loading = true
        await axios.delete(`http://localhost:5000/api/bookings/${this.bookingToDelete}`)
        this.deleteDialog = false
        this.bookingToDelete = null
        await this.fetchBookings()

        // You can add a success snackbar notification here
      } catch (error) {
        console.error('Error deleting booking:', error)
        // You can add an error snackbar notification here
      } finally {
        this.loading = false
      }
    }
  },

  mounted() {
    this.fetchBookings()
  }
}
</script>

<style scoped>
.elevation-1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
