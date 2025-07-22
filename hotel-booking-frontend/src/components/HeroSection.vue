<template>
  <!-- Video Section -->
  <v-row>
    <v-col>
      <v-card class="hero-video-container pa-0" flat>
        <!-- Overlay -->
        <v-overlay
            v-model="overlay"
            contained
            absolute
            persistent
        />

        <!-- Background Video -->
        <video
            class="hero-video"
            src="/videos/beachIntro.mp4"
            autoplay
            loop
            playsinline
            muted
        ></video>

        <!-- Centered Text -->
        <div class="centered-text">
          <h2 class="text-h2 text-white font-italic">Welcome to Softura Villa Inn</h2>
          <p class="text-h5 text-white text-uppercase font-bold mt-4">The place where you looking to</p>
        </div>
      </v-card>

      <!-- Booking Form Card (bottom of video) -->
      <v-card
          class="booking-form-card bg-white mx-auto shadow-lg rounded-sm"
      >
        <v-container class="pa-6">
          <v-row>
            <v-col cols="12" md="2">
              <v-label class="text-amber-darken-3 font-weight-medium mb-2">
                Check In
              </v-label>
              <v-text-field
                  type="date"
                  variant="outlined"
                  density="compact"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-label class="text-amber-darken-3 font-weight-medium mb-2">
                Check Out
              </v-label>
              <v-text-field
                  type="date"
                  variant="outlined"
                  density="compact"
              />
            </v-col>

            <v-col cols="12" md="2">
              <v-label class="text-amber-darken-3 font-weight-medium mb-2">
                Guests
              </v-label>
              <v-text-field
                  placeholder="2 Adults"
                  variant="outlined"
                  density="compact"
                  append-inner-icon="mdi-account-group"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-label class="text-amber-darken-3 font-weight-medium mb-2">
                Room Type
              </v-label>
              <v-select
                  :items="['Any Room', 'Luxury Room', 'Double Room', 'Family Room']"
                  variant="outlined"
                  density="compact"
              ></v-select>
            </v-col>

            <v-col cols="12" md="2">
              <v-btn
                  block
                  color="amber-darken-3"
                  class="text-white mt-8"
              >
                Book Now
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const overlay = ref(true)
</script>

<style scoped>
.hero-video-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
}

.hero-video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
}

.text-h1 {
  color: white;
}

.booking-form-card {
  width: 90%;
  margin-top: -60px;
  z-index: 10;
  position: relative;
}
@media (min-width: 960px) {
  .booking-form-card {
    width: 80%;
    margin-top: -100px;
  }
}
</style>
