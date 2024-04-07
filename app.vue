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
  const cartStorageAdmin = $localStorage('get', 'cart_storage_admin') as {
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
  if (!cartStorageAdmin || (cartStorageAdmin && !cartStorageAdmin.length)) {
    $localStorage('set', 'cart_storage_admin', [])
  }
})
</script>

<template>
  <v-app id="app" class="bg-gray-light">
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </v-app>
</template>