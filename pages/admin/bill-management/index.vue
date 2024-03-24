<script setup lang="ts">
  import type { IListBill } from 'define/bill'
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
      console.log(data.list_billl)
      listBill.push(...data.list_billl)
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
    }
    loading.value = false
  }

  onMounted(async () => {
    await getList()
  })
</script>
<template>
  <div>Bill</div>
</template>