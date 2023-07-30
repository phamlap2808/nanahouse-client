<script setup lang="ts">
  import type { IProductCreate } from 'define/product'
  import ProductEditor from 'components/admin/product/product-editor.vue'
  definePageMeta({
    layout: 'admin'
  })

  const formData: IProductCreate = reactive({
    title: '',
    description: '',
    category_id: null,
    origin_price: null,
    friendly_price: null,
    quantity: null,
    availability: null,
    thumbnail: '',
    images: [],
    og_title: '',
    og_description: '',
    og_url: ''
  })

  const onCreateProduct = (data: IProductCreate) => {
    console.log('111111111111111111', data)
  }
</script>

<template>
  <div class="product-create">
    <h1>Tạo sản phẩm mới</h1>
    <ProductEditor :data="formData" mode="create" @create="onCreateProduct" />
  </div>
</template>
