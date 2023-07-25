<script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })
</script>

<template>
  <div class="product-create">
    <h1>product-create</h1>
    <div>
      <ClientOnly>
        <QuillEditor theme="snow" toolbar="minimal" class="h-100" />
      </ClientOnly>
    </div>
  </div>
</template>
