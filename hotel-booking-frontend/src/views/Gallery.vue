<template>
  <v-container fluid class="pa-8">
    <v-row class="my-8">
      <v-col cols="12">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="gallery-title display-1 mb-4">Why To Choose Us?</h1>

          <!-- Category tabs -->
          <div class="category-tabs mb-8">
            <v-chip-group
                v-model="selectedCategory"
                selected-class="text-amber-darken-4"
                color="black"
                mandatory
            >
              <v-chip
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                  variant="outlined"
                  color="white"
                  class="mx-2 text-black"
                  size="large"
              >
                {{ category }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>

        <!-- Gallery Grid -->
        <v-row class="gallery-grid">
          <v-col
              v-for="(item, index) in galleryItems"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              class="pa-2"
          >
            <v-card
                class="gallery-item"
                hover
                @click="openLightbox(index)"
            >
              <v-img
                  :src="item.image"
                  :alt="item.title"
                  height="250"
                  cover
                  class="gallery-image"
              >
                <div class="gallery-overlay">
                  <v-icon color="white" size="48">mdi-magnify-plus</v-icon>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="end" class="mt-4" v-if="showViewAllButton">
          <v-col cols="auto">
            <v-btn
                color="amber-darken-4"
                variant="outlined"
                @click="showAll = true"
            >
              View All
            </v-btn>
          </v-col>
        </v-row>

        <!-- Lightbox Dialog -->
        <v-dialog
            v-model="lightboxDialog"
            max-width="800"
        >
          <v-card v-if="selectedImage">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  icon
                  variant="text"
                  class="lightbox-close-btn"
                  @click="lightboxDialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
            <v-img
                :src="selectedImage.image"
                :alt="selectedImage.title"
                max-height="600"
                contain
            ></v-img>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, computed, watch} from 'vue'

// Reactive data
const selectedCategory = ref('ALL')
const lightboxDialog = ref(false)
const selectedImageIndex = ref(0)
const showAll = ref(false)

// Categories
const categories = ['ALL', 'CELEBRATIONS', 'VILLA', 'RESTAURANTS', 'SERVICES']

// Gallery items (replace with your actual images)
const allGalleryItems = ref([
  {
    id: 1,
    image: '/images/wedding.jpeg',
    title: 'Wedding',
    category: 'CELEBRATIONS'
  },
  {
    id: 2,
    image: '/images/birthday.jpeg',
    title: 'Birthday',
    category: 'CELEBRATIONS'
  },
  {
    id: 3,
    image: '/images/love.jpeg',
    title: 'Love',
    category: 'CELEBRATIONS'
  },
  {
    id: 4,
    image: '/images/decoration.jpeg',
    title: 'Decoration',
    category: 'CELEBRATIONS'
  },
  {
    id: 5,
    image: '/images/mehendi.jpeg',
    title: 'Mehendi Function',
    category: 'CELEBRATIONS'
  },
  {
    id: 6,
    image: '/images/evening.jpeg',
    title: 'Outdoor Wedding',
    category: 'CELEBRATIONS'
  },
  {
    id: 7,
    image: '/images/look.jpeg',
    title: 'Wedding',
    category: 'VILLA'
  },
  {
    id: 8,
    image: '/images/pond.jpeg',
    title: 'Wedding',
    category: 'VILLA'
  },
  {
    id: 9,
    image: '/images/room.jpeg',
    title: 'Wedding',
    category: 'VILLA'
  },
  {
    id: 10,
    image: '/images/bed.jpeg',
    title: 'Wedding',
    category: 'VILLA'
  },
  {
    id: 11,
    image: '/images/hotel.jpeg',
    title: 'Wedding',
    category: 'VILLA'
  },
  {
    id: 12,
    image: '/images/tea.jpeg',
    title: 'Wedding',
    category: 'VILLA'
  },
  {
    id: 13,
    image: '/images/meal.jpeg',
    title: 'Wedding',
    category: 'RESTAURANTS'
  },
  {
    id: 14,
    image: '/images/indoor.jpeg',
    title: 'Wedding',
    category: 'RESTAURANTS'
  },
  {
    id: 15,
    image: '/images/outdoor.jpeg',
    title: 'Wedding',
    category: 'RESTAURANTS'
  },
  {
    id: 16,
    image: '/images/evemeal.jpeg',
    title: 'Wedding',
    category: 'RESTAURANTS'
  },
  {
    id: 17,
    image: '/images/beachmeal.jpeg',
    title: 'Wedding',
    category: 'RESTAURANTS'
  },
  {
    id: 18,
    image: '/images/bbq.jpeg',
    title: 'Wedding',
    category: 'RESTAURANTS'
  },
  {
    id: 19,
    image: '/images/bar.jpeg',
    title: 'Bar',
    category: 'SERVICES'
  },
  {
    id: 20,
    image: '/images/pool.jpeg',
    title: 'Swimming Pool',
    category: 'SERVICES'
  },
  {
    id: 21,
    image: '/images/fitness.jpeg',
    title: 'JYM',
    category: 'SERVICES'
  },
  {
    id: 22,
    image: '/images/spaa.jpeg',
    title: 'SPA',
    category: 'SERVICES'
  },
  {
    id: 23,
    image: '/images/coffee.jpeg',
    title: 'Coffee Area',
    category: 'SERVICES'
  },
  {
    id: 24,
    image: '/images/interior.jpeg',
    title: 'Wedding',
    category: 'SERVICES'
  }
])

// Computed properties
const galleryItems = computed(() => {
  let filtered = selectedCategory.value === 'ALL'
      ? allGalleryItems.value
      : allGalleryItems.value.filter(item => item.category === selectedCategory.value)

  return showAll.value ? filtered : filtered.slice(0, 6)
})

const showViewAllButton = computed(() => {
  const filtered = selectedCategory.value === 'ALL'
      ? allGalleryItems.value
      : allGalleryItems.value.filter(item => item.category === selectedCategory.value)

  return filtered.length > 6 && !showAll.value
})

const selectedImage = computed(() => galleryItems.value[selectedImageIndex.value])

const openLightbox = (index) => {
  selectedImageIndex.value = index
  lightboxDialog.value = true
}

watch(selectedCategory, () => {
  showAll.value = false
})

</script>

<style scoped>
.gallery-title {
  font-family: 'Georgia', serif;
  font-weight: 300;
  color: #333;
  margin-bottom: 20px;
  position: relative;
}

.gallery-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: #FFA000;
  margin: 10px auto 0 auto;
}

.category-tabs {
  margin: 0 auto;
  max-width: 600px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.gallery-image {
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

</style>