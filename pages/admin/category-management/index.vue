<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import type { IDataTableHeader } from 'define/data-table'
  import DialogCreateCategory from 'components/category/dialog-create-category.vue'
  import DialogEditCategory from 'components/category/dialog-edit-category.vue'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const listCategory = ref<ICategory[]>([])
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const selectionItem = ref<{ id: number; name: string }>({
    id: 0,
    name: ''
  })

  const loading = ref(false)

  const headers: IDataTableHeader[] = [
    {
      title: 'Tên danh mục',
      align: 'start',
      sortable: false,
      key: 'name'
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
    const res = await $axios.get($endpoint.categoryList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data
    }
    loading.value = false
  }

  const editItem = (data: any) => {
    selectionItem.value.id = data.id
    selectionItem.value.name = data.name
    toggleEditModal(true)
  }

  const deleteItem = async (data: any) => {
    const params = new URLSearchParams({ id: data.id })
    const res = await $axios.delete($endpoint.categoryDelete, { params })
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa danh mục thành công')
      showCreateModal.value = false
      getListCategory()
    }
  }

  onMounted(() => {
    getListCategory()
  })
</script>

<template>
  <div class="category-page p-4">
    <h1>Quản lý danh mục</h1>
    <div class="flex justify-end mb-4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tạo danh mục </v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table
        v-if="!loading"
        :headers="headers"
        :items="listCategory"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1">
        <template #item.actions="{ item }">
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="editItem(item.raw)" />
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>

    <DialogCreateCategory
      v-if="showCreateModal"
      :is-open="showCreateModal"
      :toggle-open="toggleCreateModal"
      @refecth="getListCategory" />
    <DialogEditCategory
      v-if="showEditModal"
      :is-open="showEditModal"
      :toggle-open="toggleEditModal"
      :item-edit="selectionItem"
      @refecth="getListCategory" />
  </div>
</template>
