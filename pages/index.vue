<script setup lang="ts">
  import type { IBlog } from 'define/blog'
  import { useSystemStore } from '@/store'
  import { Code } from 'define/response-code'
  const systemStore = useSystemStore()
  const loading = ref(true)

  const listCarousel = ref<IBlog[]>([])

  const getCarousel = async () => {
    const params = new URLSearchParams({ status: '2' })
    const res = await $axios.get($endpoint.blogList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCarousel.value = data.blogs_list
    }
  }

  onMounted(async () => {
    loading.value = true
    await getCarousel()
    loading.value = false
  })
</script>

<template>
  <div>
    <div v-if="listCarousel[0]">
      <v-carousel touch>
        <v-carousel-item v-for="item in listCarousel" :key="item.id" :src="item.thumbnail" aspect-ratio="4/3" cover />
        <!-- <v-carousel-item
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
          cover></v-carousel-item> -->
      </v-carousel>
    </div>
  </div>
</template>
