<template>
  <v-app-bar flat class="py-4 px-6 shadow-sm bg-grey-lighten-3" height="80">
    <!-- Brand -->
    <div class="text-amber-darken-3 font-weight-bold text-h6 leading-tight">
      <div>Softura</div>
      <div>Villa Inn</div>
    </div>

    <v-spacer></v-spacer>

    <!-- Desktop Nav -->
    <nav class="d-none d-md-flex gap-6 align-center">
      <v-btn
          v-for="item in navItems"
          :key="item.name"
          class="font-weight-bold text-capitalize"
          :class="activeTab === item.name ? 'text-amber-darken-4' : 'text-black'"
          :to="item.to"
          @click="activeTab = item.name"
          router
      >
        {{ item.name }}
      </v-btn>
    </nav>

    <!-- Mobile Menu Icon -->
    <v-btn icon class="d-md-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Rooms', to: '/rooms' },
  { name: 'Services', to: '/services' },
  { name: 'Events', to: '/events' },
  { name: 'Contact Us', to: '/contact' },
]

const activeTab = ref('Home')
</script>

<style scoped>
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.gap-6 {
  gap: 24px;
}
.text-capitalize {
  text-transform: capitalize;
}
.leading-tight {
  line-height: 1.2;
}
</style>
