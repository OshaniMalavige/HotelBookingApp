<template>
      <v-container fluid class="pa-8">
        <v-row align="center" class="min-vh-100">
          <!-- Left Column - About Us Content -->
          <v-col cols="12" md="6" class="pr-md-8">
            <div>
              <h1 class="about-title display-1">About Us</h1>

              <div class="about-text mb-6">
                <p class="mb-6">
                  Welcome to Villa Inn, your premier destination for seamless and luxurious hotel bookings. At Villa Inn, we are dedicated to providing travelers with a hassle-free booking experience, offering a curated selection of high-quality accommodations worldwide. Whether you're planning a relaxing getaway, a business trip, or a family vacation, our platform ensures you find the perfect stay at the best prices.
                </p>

                <p class="mb-0">
                  With user-friendly features, secure payment options, and 24/7 customer support, Villa Inn is committed to making your travel dreams a reality. Discover comfort, convenience, and exceptional hospitality with every booking only at Villa Inn.
                </p>
              </div>
            </div>
          </v-col>

          <!-- Right Column - Image Grid -->
          <v-col cols="12" md="6">
            <div class="image-grid">
              <div class="grid-item grid-item-1">
                <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beach umbrella and blue sky">
              </div>
              <div class="grid-item grid-item-2">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Surfer riding a wave">
              </div>
              <div class="grid-item grid-item-3">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Spa treatment with tropical flowers">
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
</template>

<script setup>

</script>

<style>
.about-title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
}

.about-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #B8860B;
  margin-top: 10px;
}

.about-text {
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  font-family: 'Arial', sans-serif;
}

.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 8px;
  height: 100%;
  min-height: 400px;
}

.grid-item {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.grid-item:hover img {
  transform: scale(1.05);
}

.grid-item-1 {
  grid-column: 1 / 3;
  height: 180px;
}

.grid-item-2 {
  height: 200px;
}

.grid-item-3 {
  height: 200px;
}

@media (max-width: 960px) {
  .image-grid {
    min-height: 350px;
  }

  .grid-item-1 {
    height: 150px;
  }

  .grid-item-2,
  .grid-item-3 {
    height: 180px;
  }
}

@media (max-width: 600px) {
  .image-grid {
    grid-template-columns: 1fr;
    min-height: 500px;
  }

  .grid-item-1 {
    grid-column: 1;
    height: 200px;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .about-text {
    font-size: 15px;
  }
}
</style>