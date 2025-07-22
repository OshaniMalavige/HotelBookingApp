<template>
  <v-app>
    <Header />
    <HeroSection />
    <AboutUs />
    <Services />
    <Rooms />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import HeroSection from "@/components/HeroSection.vue";
import AboutUs from "@/views/AboutUs.vue";
import Services from "@/views/Services.vue";
import Rooms from "@/views/Rooms.vue";

export default {
  components: {
    Rooms,
    AboutUs,
    HeroSection,
    Header,
    Services
  }
}
</script>
