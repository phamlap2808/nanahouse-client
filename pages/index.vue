<script setup lang="ts">
  import { useSystemStore } from '@/store'
  const systemStore = useSystemStore()
</script>

<template>
  <div>
    <v-carousel touch>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        aspect-ratio="4/3"
        cover></v-carousel-item>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        aspect-ratio="4/3"
        cover></v-carousel-item>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        aspect-ratio="4/3"
        cover></v-carousel-item>
    </v-carousel>
  </div>
</template>
