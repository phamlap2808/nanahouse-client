<script setup lang="ts">
  import type { IProductCreate } from 'define/product'
  import ProductEditor from 'components/admin/product/product-editor.vue'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const loading = ref(true)
  let formData: IProductCreate = reactive({
    title: '',
    description: '',
    category_id: null,
    origin_price: null,
    friendly_price: null,
    quantity: null,
    availability: 1,
    thumbnail: '',
    image: [],
    og_title: '',
    og_description: '',
    og_url: ''
  })

  const getProductDetail = async () => {
    loading.value = true
    const params = new URLSearchParams({ id: useRoute().params.id as string })
    const res = await $axios.get($endpoint.productDetail, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      formData = data
    }
    loading.value = false
  }

  onMounted(() => {
    getProductDetail()
  })
</script>

<template>
  <div class="product-edit">
    <h1>Chỉnh sửa sản phẩm</h1>
    <ProductEditor v-if="!loading" :data="formData" mode="edit" />
  </div>
</template>
