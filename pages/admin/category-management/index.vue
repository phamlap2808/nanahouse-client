<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import type { IDataTableHeader } from 'define/data-table'
  import DialogCreateCategory from 'components/admin/category/dialog-create-category.vue'
  import DialogEditCategory from 'components/admin/category/dialog-edit-category.vue'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const listCategory = ref<ICategory[]>([])
  const listCategoryChild = ref<ICategory[]>([])
  const categoryHome = ref<number[]>([])
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const selectionItem = ref<{ category_id: number; category_name: string; parent_id: number | null }>({
    category_id: 0,
    category_name: '',
    parent_id: null
  })

  const loading = ref(false)
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(10)
  const totalRecord = ref(0)

  const headers: IDataTableHeader[] = [
    {
      title: 'Tên danh mục',
      align: 'start',
      sortable: false,
      key: 'category_name'
    },
    {
      title: '',
      align: 'end',
      sortable: false,
      key: 'actions'
    }
  ]

  const toggleCreateModal = (value: boolean) => {
    showCreateModal.value = value
  }
  const toggleEditModal = (value: boolean) => {
    showEditModal.value = value
  }

  const getListCategory = async () => {
    loading.value = true
    const params = new URLSearchParams({
      raw: '0',
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
    }
    loading.value = false
  }

  const getListCategoryChild = async () => {
    loading.value = true
    const params = new URLSearchParams({
      raw: '2'
    })
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategoryChild.value = data
    }
    loading.value = false
  }

  const editItem = (data: any) => {
    selectionItem.value.category_id = data.category_id
    selectionItem.value.category_name = data.category_name
    selectionItem.value.parent_id = data.parent_id
    toggleEditModal(true)
  }

  const deleteItem = async (data: any) => {
    const params = new URLSearchParams({ id: data.category_id })
    const res = await $axios.delete($endpoint.categoryDelete, { params })
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa danh mục thành công')
      showCreateModal.value = false
      await getListCategory()
    }
  }

  const getListCategoryHome = async () => {
    categoryHome.value = []
    const res = await $axios.get($endpoint.listCategoryHome)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      data.forEach((item: { category_id: number }) => {
        categoryHome.value.push(item.category_id)
      })
    }
  }

  const HandleListCategoryHome = async () => {
    const data = {
      updateStt: categoryHome.value
    }
    const res = await $axios.post($endpoint.editCategoryHome, data)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Cập nhật danh mục trang chủ thành công')
    }
  }

  const fetchData = async () => {
    await getListCategoryChild()
    await getListCategoryHome()
  }

  onMounted(async () => {
    await fetchData()
  })
</script>

<template>
  <div class="category-page p-4">
    <h1>Quản lý danh mục</h1>
    <div class="flex justify-end mb-4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tạo danh mục</v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table
        v-model:items-per-page="totalPageRecord"
        :headers="headers"
        :items="listCategory"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1"
        :show-current-page="true"
        :items-length="totalRecord"
        @update:options="getListCategory">
        <template #item.actions="{ item }">
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="editItem(item.raw)" />
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>

    <h1>Quản lý trang chủ</h1>
    <v-select
      v-model="categoryHome"
      :flat="true"
      :items="listCategoryChild"
      :chips="true"
      :multiple="true"
      item-title="category_name"
      item-value="category_id" />
    <v-btn @click="HandleListCategoryHome">Cập nhật trang chủ</v-btn>

    <DialogCreateCategory
      v-if="showCreateModal"
      :is-open="showCreateModal"
      :toggle-open="toggleCreateModal"
      @refecth="fetchData" />
    <DialogEditCategory
      v-if="showEditModal"
      :is-open="showEditModal"
      :toggle-open="toggleEditModal"
      :item-edit="selectionItem"
      @refecth="fetchData" />
  </div>
</template>
