<script setup lang="ts">
  import { IDataTableHeader } from 'define/data-table'
  import { IProduct } from 'define/product'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const listProduct = ref<IProduct[]>([])

  const loading = ref(false)
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(10)
  const totalRecord = ref(0)

  const headers: IDataTableHeader[] = [
    {
      title: 'Mã sản phẩm',
      align: 'start',
      key: 'SKU'
    },
    {
      title: 'Tên sản phẩm',
      align: 'start',
      key: 'title'
    },
    {
      title: 'Hình ảnh',
      align: 'start',
      key: 'thumbnail'
    },
    {
      title: 'Danh mục',
      align: 'start',
      key: 'category_name'
    },
    {
      title: 'Giá gốc',
      align: 'start',
      key: 'origin_price'
    },
    {
      title: 'Giá thành viên',
      align: 'start',
      key: 'friendly_price'
    },
    {
      title: 'Khuyến mãi',
      align: 'start',
      key: 'discount'
    },
    {
      title: 'Số lượng',
      align: 'start',
      key: 'quantity'
    },
    {
      title: 'Trạng thái',
      align: 'start',
      key: 'availability'
    },
    {
      title: '',
      align: 'end',
      sortable: false,
      key: 'actions'
    }
  ]

  const getListProduct = async () => {
    loading.value = true
    const params = new URLSearchParams({
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    const res = await $axios.get($endpoint.productList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listProduct.value = data.products_list
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
    }
    loading.value = false
  }

  const editItem = (data: any) => {
    navigateTo({ name: 'admin-product-management-id-edit', params: { id: data.id } })
  }

  const deleteItem = async (data: any) => {
    const params = new URLSearchParams({ id: data.id })
    const res = await $axios.delete($endpoint.productDelete, { params })
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa sản phẩm thành công')
      await getListProduct()
    }
  }

  const redirectCreateProduct = () => {
    navigateTo({ name: 'admin-product-management-create' })
  }

  // onMounted(() => {
  //   getListProduct()
  // })
</script>

<template>
  <div class="product-page p-4">
    <h1>Quản lý sản phẩm</h1>
    <div class="flex justify-end mb4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="redirectCreateProduct">Tạo sản phẩm</v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table-server
        v-model:items-per-page="totalPageRecord"
        :headers="headers"
        :items="listProduct"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1"
        :show-current-page="true"
        :items-length="totalRecord"
        @update:options="getListProduct">
        <template #item.thumbnail="{ item }">
          <img :src="item.raw.thumbnail" class="size-14" :alt="item.raw.thumbnail" />
        </template>
        <template #item.origin_price="{ item }">
          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.raw.origin_price) }}
        </template>
        <template #item.friendly_price="{ item }">
          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.raw.friendly_price) }}
        </template>
        <template #item.availability="{ item }">
          {{ item.raw.availability ? 'Còn hàng' : 'Hết hàng' }}
        </template>
        <template #item.actions="{ item }">
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="editItem(item.raw)" />
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>
