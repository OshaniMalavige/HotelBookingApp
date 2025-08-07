<template>
  <v-app>
    <Header />
    <HeroSection />
    <AboutUs />
    <Services />
    <Rooms />
    <Gallery />
    <Events />
    <Offers />
    <Contact />
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import HeroSection from "@/components/HeroSection.vue";
import AboutUs from "@/views/AboutUs.vue";
import Services from "@/views/Services.vue";
import Rooms from "@/views/Rooms.vue";
import Gallery from "@/views/Gallery.vue";
import Events from "@/views/Events.vue";
import Footer from "@/components/Footer.vue";
import Offers from "@/views/Offers.vue";
import Contact from "@/views/Contact.vue";

export default {
  components: {
    Contact,
    Offers,
    Footer,
    Events,
    Gallery,
    Rooms,
    AboutUs,
    HeroSection,
    Header,
    Services
  }
}
</script>
