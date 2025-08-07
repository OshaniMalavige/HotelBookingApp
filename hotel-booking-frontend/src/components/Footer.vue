<template>
  <v-footer class="d-flex flex-column bg-grey-lighten-3" rounded="lg">
    <div class="d-flex w-100 align-center px-4 py-2">
      <strong>Get connected with Softura Villa Inn on our social networks</strong>

      <div class="d-flex ga-2 ms-auto">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            size="small"
            class="text-amber-darken-4"
            variant="plain"
        ></v-btn>
      </div>
    </div>

    <div class="px-4 py-2 text-center w-100 rounded-lg">
      ©Softura{{ new Date().getFullYear() }}, All rights reserved.
    </div>
  </v-footer>
</template>
<script setup>
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
</script>