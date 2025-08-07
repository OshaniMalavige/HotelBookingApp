<template>
  <v-container fluid class="pa-8">
    <v-row class="my-8">
      <v-col cols="12">
        <div class="text-center mb-8">
          <h1 class="title display-1 mb-4">Best Offer this Month</h1>
        </div>
      </v-col>

      <v-row class="offers-grid justify-center">
        <v-col
            v-for="(offers, index) in offers"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="pa-3"
        >
          <v-card class="mx-auto" max-width="900">
            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-img
                    :src="offers.image"
                    :alt="offers.title"
                    height="250px"
                    cover
                ></v-img>
              </v-col>

              <v-col cols="12" md="8">
                <!-- Increased font size for discount -->
                <v-card-title class="text-center my-5 font-weight-bold discount-text">
                  {{ offers.discount }}% Off
                </v-card-title>

                <v-card-text class="text-center mt-6">
                  {{ offers.description }}
                </v-card-text>

                <div class="text-center mb-12">
                  <v-btn
                      variant="elevated"
                      color="amber-darken-3"
                      class="text-white rounded-pill px-6"
                      to="/bookings"
                  >
                    Book Now
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const offers = ref([
  {
    id: 1,
    discount: "50",
    description: "Enjoy an incredible 50% off on weddings at Softura Villa Inn!",
    image: "/images/wedding.jpeg",
  },
  {
    id: 2,
    discount: "30",
    description: "Enjoy an incredible 30% off on weddings at Softura Villa Inn!",
    image: "/images/mehendi.jpeg",
  },
  {
    id: 3,
    discount: "10",
    description: "Enjoy an incredible 10% off on weddings at Softura Villa Inn!",
    image: "/images/lux.jpg",
  },
]);
</script>

<style scoped>
.title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
  position: relative;
}

.title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #FFA000;
  margin: 10px auto 0 auto;
}

.discount-text {
  font-size: 2rem;
}

</style>
