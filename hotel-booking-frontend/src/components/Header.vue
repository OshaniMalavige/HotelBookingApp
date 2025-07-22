<template>
  <v-app-bar flat color="white" class="py-4 px-6 shadow-sm" height="80">
    <!-- Brand -->
    <div class="text-amber-darken-3 font-weight-bold text-h6 leading-tight">
      <div>Softura</div>
      <div>Villa Inn</div>
    </div>

    <v-spacer></v-spacer>

    <!-- Desktop Nav -->
    <nav class="d-none d-md-flex gap-6 align-center">
      <v-btn
          v-for="(item, index) in navItems"
          :key="item"
          text
          class="font-weight-bold text-capitalize"
          :class="index === 0 ? 'text-amber-darken-3' : 'text-black'"
          href="#"
      >
        {{ item }}
      </v-btn>
    </nav>

    <!-- Mobile Menu Icon -->
    <v-btn icon class="d-md-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
const navItems = ['Home', 'Rooms', 'Services', 'Events', 'Contact Us']
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
