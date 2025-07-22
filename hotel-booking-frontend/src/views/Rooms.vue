<template>
      <v-container fluid class="pa-8">
        <v-row class="my-16">
          <v-col cols="12">
            <!-- Section Header -->
            <div class="text-center mb-16">
              <h2 class="rooms-title display-1 mb-6">Our Rooms</h2>
              <div class="rooms-description mx-auto">
                <p class="description-text">
                  When you host a party or family reunion, the special celebrations lot you strong then bonds with
                </p>
              </div>
            </div>

            <!-- Room Cards -->
            <v-row class="justify-center">
              <v-col
                  cols="12"
                  md="4"
                  v-for="room in rooms"
                  :key="room.type"
                  class="mb-8"
              >
                <div class="room-card">
                  <!-- Room Image -->
                  <div class="room-image-container">
                    <img :src="room.image" :alt="room.type" class="room-image">
                    <div class="room-image-overlay"></div>
                  </div>

                  <!-- Room Content -->
                  <div class="room-content">
                    <h3 class="room-type">{{ room.type }}</h3>
                    <p class="room-price">{{ room.price }}</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: 'Rooms',
  data() {
    return {
      rooms: [
        {
          type: 'LUXURY ROOM',
          price: '$320/ PER NIGHT',
          image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          type: 'DOUBLE ROOM',
          price: '$320/ PER NIGHT',
          image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          type: 'FAMILY ROOM',
          price: '$320/ PER NIGHT',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  },
  methods: {
    // Component methods can go here
    onRoomClick(room) {
      console.log('Room selected:', room.type);
      // Handle room selection/booking logic here
    }
  }
}
</script>

<style scoped>
.rooms-title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  font-size: 3.5rem;
}

.rooms-title::after {
  content: '';
  display: block;
  width: 120px;
  height: 3px;
  background: #B8860B;
  margin: 20px auto 0 auto;
}

.rooms-description {
  max-width: 600px;
}

.description-text {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  font-family: 'Arial', sans-serif;
  margin: 0;
}

/* Room Cards Styles */
.room-card {
  background: white;
  border-radius: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: 100%;
}

.room-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.room-image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.room-card:hover .room-image {
  transform: scale(1.1);
}

.room-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.room-card:hover .room-image-overlay {
  opacity: 1;
}

.room-content {
  padding: 30px 20px;
  text-align: center;
  background: white;
}

.room-type {
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #333;
  margin: 0 0 15px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.room-price {
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  color: #B8860B;
  margin: 0;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 960px) {
  .rooms-title {
    font-size: 3rem;
  }

  .room-image-container {
    height: 250px;
  }

  .room-content {
    padding: 25px 15px;
  }
}

@media (max-width: 600px) {
  .rooms-title {
    font-size: 2.5rem;
  }

  .rooms-title::after {
    width: 80px;
    margin-top: 15px;
  }

  .description-text {
    font-size: 16px;
  }

  .room-image-container {
    height: 220px;
  }

  .room-content {
    padding: 20px 15px;
  }

  .room-type {
    font-size: 1.2rem;
  }

  .room-price {
    font-size: 1.1rem;
  }
}

/* Animation for better UX */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.room-card {
  animation: fadeInUp 0.6s ease forwards;
}

.room-card:nth-child(2) {
  animation-delay: 0.2s;
}

.room-card:nth-child(3) {
  animation-delay: 0.4s;
}
</style>