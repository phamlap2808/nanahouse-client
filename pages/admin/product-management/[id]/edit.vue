<script setup lang="ts">
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const loading = ref(true)

  const getProductDetail = async () => {
    loading.value = true
    const params = new URLSearchParams({ id: useRoute().params.id as string })
    const res = await $axios.get($endpoint.productDetail, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      console.log(data)
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
  </div>
</template>
