<script setup lang="ts">
  import type { IListBill } from 'define/bill'
  import { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const listBill: IListBill[] = reactive([])

  const loading = ref(false)
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(10)
  const totalRecord = ref(0)

  const headers: IDataTableHeader[] = [
    {
      title: 'Mã hóa đơn',
      align: 'start',
      key: 'bill_id'
    },
    {
      title: 'Tên khách hàng',
      align: 'start',
      key: 'user_infor.name'
    },
    {
      title: 'Số điện thoại',
      align: 'start',
      key: 'user_infor.phone_number'
    },
    {
      title: 'Email',
      align: 'start',
      key: 'user_infor.email'
    },
    {
      title: 'Tổng tiền',
      align: 'start',
      key: 'total_amout'
    },
    {
      title: 'Trạng thái',
      align: 'start',
      key: 'bill_status'
    },
    {
      title: 'Xem chi tiết',
      align: 'start',
      key: 'view_detail'
    }
  ]

  const getList = async () => {
    loading.value = true
    const params = new URLSearchParams({
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    const res = await $axios.get($endpoint.listBill, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listBill.length = 0

      listBill.push(...data.list_billl)
      console.log(listBill)
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
    }
    loading.value = false
  }
</script>
<template>
  <div class="bill-page p-4 m-10 px-4 py-10 bg-white rounded-3xl flex flex-col gap-10">
    <h1>Quản lý hóa đơn</h1>
    <v-data-table-server
      v-model:items-per-page="totalPageRecord"
      :headers="headers"
      :items="listBill"
      :loading="loading"
      loading-text="Tải dữ liệu"
      class="elevation-1"
      :show-current-page="true"
      :items-length="totalRecord"
      @update:options="getList">
      <template #item.bill_status="{ item }">
        {{ item.raw.bill_status === 1 ? 'Đã thanh toán' : 'Chưa thanh toán' }}
      </template>
      <template #item.view_detail="{ item }">
        <v-icon size="small" icon="mdi-eye" />
      </template>
    </v-data-table-server>
  </div>
</template>
