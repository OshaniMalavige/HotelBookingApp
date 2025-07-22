<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-8">
        <v-row class="my-16">
          <v-col cols="12">
            <!-- Section Header -->
            <div class="text-center mb-12">
              <h2 class="amenities-title display-1 mb-4">Amenities & Services</h2>
              <div class="amenities-description mx-auto">
                <p class="about-text text-center">
                  Indulge in exquisite dining at our restaurant, offering a diverse menu of local and international flavors. Rejuvenate at our spa & wellness center, where relaxation meets luxury with tailored treatments. Host unforgettable celebrations, meetings, and events in our elegant venues, while staying active in our modern fitness center or unwinding by our serene pool.
                </p>
              </div>
            </div>

            <!-- Services Cards -->
            <v-row>
              <v-col cols="12" sm="6" md="3" v-for="service in services" :key="service.title">
                <div class="service-card">
                  <div class="service-image-container">
                    <img :src="service.image" :alt="service.title" class="service-image">
                    <div class="service-overlay">
                      <h3 class="service-title">{{ service.title }}</h3>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AmenitiesServices',
  data() {
    return {
      services: [
        {
          title: 'Restaurant',
          image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Spa',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Celebration',
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Fitness Center',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ]
    }
  },
  methods: {
    // Component methods can go here
  }
}
</script>

<style scoped>
.about-text {
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  font-family: 'Arial', sans-serif;
}

.amenities-title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
  position: relative;
}

.amenities-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #B8860B;
  margin: 10px auto 0 auto;
}

.amenities-description {
  max-width: 800px;
}

/* Service Cards Styles */
.service-card {
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.service-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.service-card:hover .service-image {
  transform: scale(1.05);
}

.service-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.service-card:hover .service-overlay {
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%);
}

.service-title {
  color: white;
  font-size: 2.5rem;
  font-family: 'Georgia', serif;
  font-weight: 300;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin: 0;
  padding: 0 20px;
}

@media (max-width: 600px) {
  .service-card {
    height: 300px;
    margin-bottom: 16px;
  }

  .service-title {
    font-size: 2rem;
  }
}
</style>