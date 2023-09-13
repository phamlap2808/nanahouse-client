<script setup lang="ts">
  const props = defineProps({
    productId: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    categoryName: {
      type: String,
      required: true
    },
    originalPrice: {
      type: Number,
      required: true
    },
    friendlyPrice: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="bg-gray-light px-4 py-4">
    <div class="w-full flex justify-center mb-4">
      <img :src="props.thumbnail" alt="thumbnail" class="w-52 h-52" />
    </div>
    <div>
      <div>{{ props.productName }}</div>
      <div>{{ props.originalPrice }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
