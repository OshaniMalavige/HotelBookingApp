<template>
  <v-container fluid class="pa-8">
    <v-row class="my-8">
      <v-col cols="12">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="events-title display-1 mb-4">Upcoming Events</h1>
        </div>

        <!-- Events Grid -->
        <v-row class="events-grid justify-center">
          <v-col
              v-for="(event, index) in events"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              class="pa-3"
          >
            <v-card
                class="event-card"
                hover
                elevation="4"
                @click="viewEventDetails(event)"
            >
              <!-- Event Image -->
              <div class="event-image-container">
                <v-img
                    :src="event.image"
                    :alt="event.title"
                    height="200"
                    cover
                    class="event-image"
                >
                  <div class="image-overlay">
                    <v-icon color="white" size="32">mdi-calendar-heart</v-icon>
                  </div>
                </v-img>

                <!-- Date Badge -->
                <div class="date-badge">
                  <div class="date-day">{{ event.day }}</div>
                  <div class="date-month">{{ event.month }}</div>
                </div>
              </div>

              <!-- Event Content -->
              <v-card-text class="pa-4">
                <h3 class="text-h6 font-weight-medium text-grey-800 mb-2">
                  {{ event.title }}
                </h3>
                <p class="text-body-2 text-grey-600 mb-3">
                  {{ event.description }}
                </p>

                <!-- Event Meta Info -->
                <div class="event-meta">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="grey-600" size="16" class="mr-2">mdi-clock-outline</v-icon>
                    <span class="text-caption text-grey-600">{{ event.time }}</span>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <v-icon color="grey-600" size="16" class="mr-2">mdi-map-marker-outline</v-icon>
                    <span class="text-caption text-grey-600">{{ event.location }}</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="grey-600" size="16" class="mr-2">mdi-account-group-outline</v-icon>
                    <span class="text-caption text-grey-600">{{ event.attendees }} attending</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Load More Button -->
        <v-row justify="end" class="mt-4" v-if="hasMoreEvents">
          <v-col cols="auto">
            <v-btn
                color="amber-darken-4"
                variant="outlined"
                size="large"
                class="px-8"
                @click="loadMoreEvents"
                :loading="loadingMore"
            >
              More Events
            </v-btn>
          </v-col>
        </v-row>

        <!-- Event Details Dialog -->
        <v-dialog
            v-model="eventDialog"
            max-width="600"
        >
          <v-card v-if="selectedEvent">
            <v-img
                :src="selectedEvent.image"
                height="250"
                cover
            ></v-img>

            <v-card-title class="text-h5">
              {{ selectedEvent.title }}
            </v-card-title>

            <v-card-text>
              <p class="mb-4">{{ selectedEvent.description }}</p>

              <v-row dense>
                <v-col cols="6">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="grey-600" size="20" class="mr-2">mdi-calendar</v-icon>
                    <span>{{ selectedEvent.day }} {{ selectedEvent.month }}</span>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="grey-600" size="20" class="mr-2">mdi-clock-outline</v-icon>
                    <span>{{ selectedEvent.time }}</span>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="grey-600" size="20" class="mr-2">mdi-map-marker-outline</v-icon>
                    <span>{{ selectedEvent.location }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="grey"
                  variant="text"
                  @click="eventDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="red"
                  @click="registerForEvent(selectedEvent)"
              >
                Register Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const eventDialog = ref(false)
const selectedEvent = ref(null)
const loadingMore = ref(false)
const hasMoreEvents = ref(true)

// Events data (replace with your actual data)
const events = ref([
  {
    id: 1,
    day: '22',
    month: 'August',
    title: 'Kite Festival',
    description: 'The event will feature the world\'s number one stunt kite team, the Three Wind Kite Team from Wuhan, China. This team has also won the World Kite Championship for three consecutive years.',
    image: '/images/kite.jpeg',
    time: '9:00 AM - 6:00 PM',
    location: 'Marble Beach',
    attendees: 120
  },
  {
    id: 2,
    day: '13',
    month: 'SEPTEMBER',
    title: 'Outdoor Music Festival',
    description: 'Festivals typically have multiple stages with different artists performing throughout the day.',
    image: '/images/music.jpeg',
    time: '6:00 PM - 11:00 PM',
    location: 'Green Garden',
    attendees: 170
  },
  {
    id: 3,
    day: '15',
    month: 'October',
    title: 'Culinary Workshop',
    description: 'During the Art of Cooking like a Chef workshop, you will learn all the techniques and tips to be able to cook like a skilled cuisine Chef in your own home.',
    image: '/images/culinary.jpeg',
    time: '10:00 AM - 2:00 PM',
    location: 'Chef\'s Kitchen Studio',
    attendees: 25
  }
])

// Methods
const viewEventDetails = (event) => {
  selectedEvent.value = event
  eventDialog.value = true
}

const registerForEvent = (event) => {
  // Implement registration logic
  console.log('Registering for event:', event.title)
  // You could show a success message or redirect to registration form
}

const loadMoreEvents = async () => {
  loadingMore.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Add more dummy events (replace with actual API call)
  const moreEvents = [
    {
      id: 4,
      day: '04',
      month: 'November',
      title: 'The Wedding Show',
      description: 'The Wedding Show covers all areas of the bridal industry.',
      image: '/images/show.jpeg',
      time: '6:00 PM - 9:00 PM',
      location: 'Wine Cellar Lounge',
      attendees: 80
    },
    {
      id: 5,
      day: '29',
      month: 'November',
      title: 'Beach Party',
      description: 'From lively DJ sets to moonlit bonfires, the island offers an array of beach party experiences that cater to locals and travelers alike.',
      image: '/images/beachparty.jpeg',
      time: '4:00 PM - 11:00 PM',
      location: 'Maria Cafeteria',
      attendees: 40
    },
    {
      id: 6,
      day: '26',
      month: 'December',
      title: 'Christmas Wine Tasting Evening',
      description: 'Experience the finest wines from around the world.',
      image: '/images/wine.jpeg',
      time: '7:00 PM - 10:00 PM',
      location: 'Wine Cellar Lounge',
      attendees: 35
    }
  ]

  events.value.push(...moreEvents)
  loadingMore.value = false

  // Simulate no more events after loading once
  hasMoreEvents.value = false
}

onMounted(() => {
  // Initialize component
  console.log('Events component mounted')
})
</script>

<style scoped>
.events-title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
  position: relative;
}

.events-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: #FFA000;
  margin: 10px auto 0 auto;
}

.event-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.event-image-container {
  position: relative;
}

.event-image {
  transition: transform 0.3s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.event-card:hover .image-overlay {
  opacity: 1;
}

.date-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(244, 67, 54, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  min-width: 60px;
  backdrop-filter: blur(10px);
}

.date-day {
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
}

.date-month {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 2px;
}

.event-meta {
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
  margin-top: 12px;
}

.v-card-text {
  flex-grow: 1;
}
</style>