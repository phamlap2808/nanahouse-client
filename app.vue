<script setup lang="ts">
  onMounted(() => {
    const cartStorage = $localStorage('get', 'cart_storage') as {
      product_id: number
      price: number
      amount: number
      image: string
      slug: string
      title: string
    }[]
    if (!cartStorage || (cartStorage && !cartStorage.length)) {
      $localStorage('set', 'cart_storage', [])
    }
  })
</script>

<template>
  <v-app id="app" class="bg-white">
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </v-app>
</template>
