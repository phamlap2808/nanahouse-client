<script setup lang="ts">
  import type { IProductCreate } from 'define/product'
  import ProductEditor from 'components/admin/product/product-editor.vue'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const loading = ref(true)
  let formData: IProductCreate = reactive({
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

  const getProductDetail = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.productDetail.replace(':id', useRoute().params.id as string))
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      formData = data
      formData.category_id = data.category.id
      formData.variant_id = data.variant.id
    }
    loading.value = false
  }

  const onEditProduct = async (data: IProductCreate) => {
    const form = new FormData()
    form.append('id', useRoute().params.id as string)
    if (data.sku !== formData.sku) {
      form.append('sku', data.sku)
    }
    if (data.title !== formData.title) {
      form.append('title', data.title)
    }
    if (data.description !== formData.description) {
      form.append('description', data.description)
    }
    if (data.category_id && data.category_id !== formData.category_id) {
      form.append('category_id', data.category_id.toString())
    }
    if (data.origin_price && data.origin_price !== formData.origin_price) {
      form.append('origin_price', data.origin_price.toString())
    }
    if (data.friendly_price && data.friendly_price !== formData.friendly_price) {
      form.append('friendly_price', data.friendly_price.toString())
    }
    if (data.quantity && data.quantity !== formData.quantity) {
      form.append('quantity', data.quantity.toString())
    }
    if (data.availability && data.availability !== formData.availability) {
      form.append('availability', data.availability.toString())
    }
    if (data.thumbnail !== formData.thumbnail) {
      form.append('thumbnail', data.thumbnail)
    }
    if (data.og_title !== formData.og_title) {
      form.append('og_title', data.og_title)
    }
    if (data.og_description !== formData.og_description) {
      form.append('og_description', data.og_description)
    }
    if (data.og_url !== formData.og_url) {
      form.append('og_url', data.og_url)
    }
    if (data.images.length !== formData.images.length) {
      data.images.forEach((item: any, index: number) => {
        if (typeof item === 'object') {
          form.append(`images`, item)
        }
      })
    }

    const res = await $axios.put($endpoint.productEdit.replace(':id', useRoute().params.id as string), form)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Chỉnh sửa sản phẩm thành công')
      await getProductDetail()
    }
  }

  onMounted(() => {
    getProductDetail()
  })
</script>

<template>
  <div class="product-edit">
    <h1>Chỉnh sửa sản phẩm</h1>
    <ProductEditor v-if="!loading" :data="formData" mode="edit" @edit="onEditProduct" @refetch="getProductDetail" />
  </div>
</template>

<style scoped lang="scss">
  .product-edit {
    margin: 40px;
    padding: 24px;
    border-radius: 24px;
    background-color: #fff;
  }
</style>
