<script setup lang="ts">
  import ProductEditor from 'components/product/product-editor.vue'
  definePageMeta({
    layout: 'admin'
  })
</script>

<template>
  <div class="product-create">
    <h1>product-create</h1>
    <ProductEditor />
  </div>
</template>
