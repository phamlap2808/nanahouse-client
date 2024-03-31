<script setup lang="ts">
  import type { IDataTableHeader } from 'define/data-table'
  import type { IListPurchase } from 'define/order'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const listOrder: IListPurchase[] = reactive([])

  const loading = ref(false)
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(10)
  const totalRecord = ref(0)
  const openViewDetail = ref(false)
  const orderDetail = ref<IListPurchase>({
    orders: [],
    cart_id: 0,
    ordered_at: '',
    address: '',
    cart_status: 0,
    total_amount: 0,
    user_info: {
      name: '',
      phone_number: '',
      email: ''
    },
    type_of_customer: 0
  })

  const headers: IDataTableHeader[] = [
    {
      title: 'Mã đơn hàng',
      align: 'start',
      key: 'cart_id'
    },
    {
      title: 'Tên khách hàng',
      align: 'start',
      key: 'user_info.name'
    },
    {
      title: 'Số điện thoại',
      align: 'start',
      key: 'user_info.phone_number'
    },
    {
      title: 'email',
      align: 'start',
      key: 'user_info.email'
    },
    {
      title: 'Địa chỉ',
      align: 'start',
      key: 'address'
    },
    {
      title: 'Tổng tiền',
      align: 'start',
      key: 'total_amount'
    },
    {
      title: 'Ngày tạo',
      align: 'start',
      key: 'ordered_at'
    },
    {
      title: 'Trạng thái',
      align: 'start',
      key: 'cart_status'
    },
    {
      title: 'Xem chi tiết',
      align: 'start',
      key: 'view_detail'
    },
    {
      title: 'Xóa',
      align: 'start',
      key: 'delete'
    }
  ]

  const formatDate = (date: string) => {
    return $date(date).format('DD/MM/YYYY')
  }

  const toggleViewDetail = (value: boolean) => {
    openViewDetail.value = value
  }

  const viewDetail = (data: IListPurchase) => {
    orderDetail.value = data
    toggleViewDetail(true)
  }

  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

  const getOrderList = async () => {
    loading.value = true
    const params = new URLSearchParams({
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    const res = await $axios.get($endpoint.orderList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listOrder.length = 0
      listOrder.push(...data.list_purchase)
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
    }
    loading.value = false
  }

  const deleteItem = async (data: any) => {
    const params = new URLSearchParams({ cart_id: data.cart_id })
    const res = await $axios.delete($endpoint.orderDelete, { params })
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa danh mục thành công')
      getOrderList()
    }
  }

  const handleCreateBill = async () => {
    toggleViewDetail(false)
    await getOrderList()
  }
</script>

<template>
  <div class="order-management m-10 px-4 py-10 bg-white rounded-3xl">
    <h1>Quản lý đơn hàng</h1>
    <div v-loading="loading" class="min-h-100 mt-4">
      <v-data-table-server
        v-model:items-per-page="totalPageRecord"
        :headers="headers"
        :items="listOrder"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1"
        :show-current-page="true"
        :items-length="totalRecord"
        @update:options="getOrderList">
        <template #item.total_amount="{ item }">
          {{ formatter.format(item.raw.total_amount) }}
        </template>
        <template #item.ordered_at="{ item }">
          {{ formatDate(item.raw.ordered_at) }}
        </template>
        <template #item.cart_status="{ item }">
          {{ item.raw.cart_status === 1 ? 'Đã xuất hóa đơn' : 'Mới' }}
        </template>
        <template #item.view_detail="{ item }">
          <v-icon size="small" icon="mdi-eye" @click="viewDetail(item.raw)" />
        </template>
        <template #item.delete="{ item }">
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table-server>
      <admin-order-dialog-view-more
        v-if="openViewDetail"
        :is-open="openViewDetail"
        :toggle-open="toggleViewDetail"
        :order="orderDetail"
        :refecth="handleCreateBill" />
    </div>
  </div>
</template>
