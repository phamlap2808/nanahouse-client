<script setup lang="ts">
  import type { IProductCreate } from 'define/product'
  import ProductEditor from 'components/admin/product/product-editor.vue'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const formData: IProductCreate = reactive({
    sku: '',
    title: '',
    description: '',
    category_id: null,
    origin_price: null,
    friendly_price: null,
    quantity: null,
    availability: 1,
    thumbnail: '',
    images: [],
    og_title: '',
    og_description: '',
    og_url: '',
    variant_id: ''
  })

  const onCreateProduct = async (data: IProductCreate) => {
    const form = new FormData()
    if (data.sku) {
      form.append('sku', data.sku)
    }
    if (data.title) {
      form.append('title', data.title)
    }
    if (data.description) {
      form.append('description', data.description)
    }
    if (data.category_id) {
      form.append('category_id', data.category_id.toString())
    }
    if (data.origin_price) {
      form.append('origin_price', data.origin_price.toString())
    }
    if (data.friendly_price) {
      form.append('friendly_price', data.friendly_price.toString())
    }
    if (data.quantity) {
      form.append('quantity', data.quantity.toString())
    }
    if (data.availability) {
      form.append('availability', data.availability.toString())
    }
    if (data.thumbnail) {
      form.append('thumbnail', data.thumbnail)
    }
    if (data.og_title) {
      form.append('og_title', data.og_title)
    }
    if (data.og_description) {
      form.append('og_description', data.og_description)
    }
    if (data.og_url) {
      form.append('og_url', data.og_url)
    }
    if (data.variant_id) {
      form.append('variant_id', data.variant_id.toString())
    }
    if (data.images.length > 0) {
      data.images.forEach((item: any, index: number) => {
        form.append(`images`, item)
      })
    }

    const res = await $axios.post($endpoint.productCreate, form)
    const { code, status } = res.data
    if (status && code === 201) {
      $toast().success('Tạo sản phẩm thành công')
    }
  }
</script>

<template>
  <div class="product-create">
    <h1>Tạo sản phẩm mới</h1>
    <ProductEditor :data="formData" mode="create" @create="onCreateProduct" />
  </div>
</template>

<style scoped lang="scss">
  .product-create {
    margin: 40px;
    padding: 24px;
    border-radius: 24px;
    background-color: #fff;
  }
</style>
