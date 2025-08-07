<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <!-- Hero Section with Background -->
        <div class="hero-section">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8" lg="8">
                <v-card class="booking-card bg-grey-lighten-3" elevation="8">
                  <v-card-text class="pa-8">
                    <!-- Title -->
                    <div class="text-center mb-6">
                      <h1 class="text-h4 font-weight-bold mb-2">Hotel Booking</h1>
                      <p class="text-subtitle-1 text-medium-emphasis">Experience something new every moment</p>
                    </div>

                    <!-- Booking Form -->
                    <v-form ref="form" v-model="valid" @submit.prevent="submitBooking">
                      <!-- Name Fields -->
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="booking.firstName"
                              label="First Name"
                              variant="outlined"
                              :rules="nameRules"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model="booking.lastName"
                              label="Last Name"
                              variant="outlined"
                              :rules="nameRules"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <!-- Email -->
                      <v-text-field
                          v-model="booking.email"
                          label="E-mail"
                          placeholder="ex: myname@example.com"
                          variant="outlined"
                          :rules="emailRules"
                          required
                          class="mb-4"
                      ></v-text-field>

                      <!-- Room Type and Guests -->
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-select
                              v-model="booking.roomType"
                              label="Room Type"
                              :items="roomTypes"
                              variant="outlined"
                              :rules="requiredRules"
                              required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                              v-model.number="booking.guests"
                              label="Number of Guests"
                              placeholder="e.g., 23"
                              variant="outlined"
                              type="number"
                              :rules="guestRules"
                              required
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <!-- Arrival Date & Time -->
                      <div class="mb-4">
                        <h3 class="text-subtitle-1 mb-3">Arrival Date & Time</h3>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="booking.arrivalDate"
                                label="Date"
                                type="date"
                                variant="outlined"
                                :rules="requiredRules"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-row no-gutters>
                              <v-col cols="8">
                                <v-text-field
                                    v-model="booking.arrivalTime"
                                    label="Hour Minutes"
                                    placeholder="03:59"
                                    variant="outlined"
                                    :rules="timeRules"
                                    required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="4" class="pl-2">
                                <v-select
                                    v-model="booking.timeFormat"
                                    :items="['AM', 'PM']"
                                    variant="outlined"
                                    :rules="requiredRules"
                                    required
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </div>

                      <!-- Departure Date -->
                      <div class="mb-4">
                        <h3 class="text-subtitle-1 mb-3">Departure Date</h3>
                        <v-row>
                          <v-col cols="12" sm="4">
                            <v-select
                                v-model="booking.departureMonth"
                                label="Please select a month"
                                :items="months"
                                variant="outlined"
                                :rules="requiredRules"
                                required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select
                                v-model="booking.departureDay"
                                label="Please select a day"
                                :items="days"
                                variant="outlined"
                                :rules="requiredRules"
                                required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-select
                                v-model="booking.departureYear"
                                label="Please select a year"
                                :items="years"
                                variant="outlined"
                                :rules="requiredRules"
                                required
                            ></v-select>
                          </v-col>
                        </v-row>
                      </div>

                      <!-- Free Pickup -->
                      <div class="mb-4">
                        <h3 class="text-subtitle-1 mb-3">Free Pickup?</h3>
                        <v-radio-group v-model="booking.freePickup" row>
                          <v-radio
                              label="Yes Please! - Pick me up on arrival"
                              value="yes"
                          ></v-radio>
                          <v-radio
                              label="No Thanks - I'll make my own way there"
                              value="no"
                          ></v-radio>
                        </v-radio-group>
                      </div>

                      <!-- Special Requests -->
                      <v-textarea
                          v-model="booking.specialRequests"
                          label="Special Requests"
                          variant="outlined"
                          rows="4"
                          class="mb-6"
                      ></v-textarea>

                      <!-- Submit Button -->
                      <div class="text-center">
                        <v-btn
                            type="submit"
                            color="success"
                            size="large"
                            :loading="loading"
                            :disabled="!valid"
                            rounded
                            class="px-8 py-2"
                        >
                          Submit
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-container>

      <!-- Success Dialog -->
      <v-dialog v-model="successDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Booking Confirmed!</v-card-title>
          <v-card-text>
            Your hotel booking has been successfully submitted. We'll contact you soon with confirmation details.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="successDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Error Dialog -->
      <v-dialog v-model="errorDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Error</v-card-title>
          <v-card-text>
            {{ errorMessage }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="errorDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'HotelBooking',
  setup() {
    const valid = ref(false)
    const loading = ref(false)
    const successDialog = ref(false)
    const errorDialog = ref(false)
    const errorMessage = ref('')

    const booking = ref({
      firstName: '',
      lastName: '',
      email: '',
      roomType: '',
      guests: null,
      arrivalDate: '',
      arrivalTime: '',
      timeFormat: 'AM',
      departureMonth: '',
      departureDay: '',
      departureYear: '',
      freePickup: 'no',
      specialRequests: ''
    })

    const roomTypes = [
      'Standard Room',
      'Deluxe Room',
      'Suite',
      'Presidential Suite',
      'Family Room'
    ]

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const days = computed(() => {
      return Array.from({ length: 31 }, (_, i) => i + 1)
    })

    const years = computed(() => {
      const currentYear = new Date().getFullYear()
      return Array.from({ length: 5 }, (_, i) => currentYear + i)
    })

    // Validation rules
    const nameRules = [
      v => !!v || 'Name is required',
      v => (v && v.length >= 2) || 'Name must be at least 2 characters'
    ]

    const emailRules = [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]

    const requiredRules = [
      v => !!v || 'This field is required'
    ]

    const guestRules = [
      v => !!v || 'Number of guests is required',
      v => v > 0 || 'Number of guests must be greater than 0',
      v => v <= 20 || 'Maximum 20 guests allowed'
    ]

    const timeRules = [
      v => !!v || 'Time is required',
      v => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v) || 'Time must be in HH:MM format'
    ]

    const submitBooking = async () => {
      if (!valid.value) return

      loading.value = true

      try {
        const response = await fetch('http://localhost:3000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(booking.value)
        })

        if (response.ok) {
          successDialog.value = true
          // Reset form
          booking.value = {
            firstName: '',
            lastName: '',
            email: '',
            roomType: '',
            guests: null,
            arrivalDate: '',
            arrivalTime: '',
            timeFormat: 'AM',
            departureMonth: '',
            departureDay: '',
            departureYear: '',
            freePickup: 'no',
            specialRequests: ''
          }
        } else {
          const error = await response.json()
          errorMessage.value = error.message || 'Failed to submit booking'
          errorDialog.value = true
        }
      } catch (error) {
        errorMessage.value = 'Network error. Please try again.'
        errorDialog.value = true
      } finally {
        loading.value = false
      }
    }

    return {
      valid,
      loading,
      successDialog,
      errorDialog,
      errorMessage,
      booking,
      roomTypes,
      months,
      days,
      years,
      nameRules,
      emailRules,
      requiredRules,
      guestRules,
      timeRules,
      submitBooking
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: white;
  min-height: 100vh;
  padding: 40px 0;
}

.booking-card {
  backdrop-filter: blur(10px);
  border-radius: 16px !important;
}
</style>