<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import type { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const listCategory = ref<ICategory[]>([])
  const categoryHome = ref<number[]>([])
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const showDeleteModal = ref(false)
  const selectionItem = ref<ICategory>({
    category_id: 0,
    category_name: '',
    parent: null,
    sort: null
  })

  const sortBy = ref('')
  const listSort = ref([
    { title: 'Không sắp xếp', value: '' },
    { title: 'Trang Chủ', value: 'home' }
  ])

  const loading = ref(false)
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(10)
  const totalRecord = ref(0)

  const headers: IDataTableHeader[] = [
    {
      title: 'Thứ tự trang chủ',
      align: 'start',
      sortable: false,
      key: 'sort'
    },
    {
      title: 'Danh mục cha',
      align: 'start',
      sortable: false,
      key: 'parent'
    },
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
  const toggleDeleteModal = (value: boolean) => {
    showDeleteModal.value = value
  }

  const getListCategory = async () => {
    loading.value = true
    const params = new URLSearchParams({
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    if (sortBy.value === 'home') {
      params.append('home', 'true')
    }
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data.data.map((item: any) => {
        return {
          category_id: item._id,
          category_name: item.name,
          parent: item.parent,
          sort: item.sort
        }
      })
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
      selectionItem.value = {
        category_id: 0,
        category_name: '',
        parent: null,
        sort: null
      }
    }
    loading.value = false
  }

  const handleSelectionData = (data: any, mode: string) => {
    selectionItem.value.category_id = data.category_id
    selectionItem.value.category_name = data.category_name
    selectionItem.value.parent = data.parent
    selectionItem.value.sort = data.sort
    if (mode === 'edit') {
      toggleEditModal(true)
    }
    if (mode === 'delete') {
      toggleDeleteModal(true)
    }
  }

  const deleteItem = async (data: any) => {
    const res = await $axios.delete($endpoint.categoryDelete.replace(':id', data.category_id.toString()))
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa danh mục thành công')
      toggleDeleteModal(false)
      await getListCategory()
    }
  }

  const createCategorySuccess = async () => {
    showCreateModal.value = false
    await getListCategory()
  }

  watch(sortBy, async () => {
    await getListCategory()
  })
</script>

<template>
  <div class="category-page m-10 px-4 py-10 bg-white rounded-3xl">
    <h1>Quản lý danh mục</h1>
    <div class="flex justify-between mb-4">
      <div class="min-w-100"><v-select v-model="sortBy" :items="listSort" label="Sắp xếp" /></div>
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tạo danh mục</v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table-server
        v-model:items-per-page="totalPageRecord"
        :headers="headers"
        :items="listCategory"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1"
        :show-current-page="true"
        :items-length="totalRecord"
        @update:options="getListCategory">
        <template #item.parent="{ item }">
          {{ item.raw.parent ? item.raw.parent.name : 'Danh mục gốc' }}
        </template>
        <template #item.actions="{ item }">
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="handleSelectionData(item.raw, 'edit')" />
          <v-icon size="small" icon="mdi-delete" @click="handleSelectionData(item.raw, 'delete')" />
        </template>
      </v-data-table-server>
    </div>

    <admin-category-dialog-create-category
      v-if="showCreateModal"
      :is-open="showCreateModal"
      :toggle-open="toggleCreateModal"
      @refecth="createCategorySuccess" />
    <admin-category-dialog-edit-category
      v-if="showEditModal"
      :is-open="showEditModal"
      :toggle-open="toggleEditModal"
      :item-edit="selectionItem"
      @refecth="createCategorySuccess" />
    <dialog-base v-if="showDeleteModal" :is-open="showDeleteModal" :toggle-open="toggleDeleteModal">
      <template #main>
        <div>
          <p>Bạn có chắc chắn muốn xóa danh mục {{ selectionItem.category_name }} không?</p>
        </div>
      </template>
      <template #footer>
        <div class="flex mt-4 gap-4 justify-center items-center">
          <v-btn type="submit" variant="outlined" @click="toggleDeleteModal(false)">Hủy</v-btn>
          <v-btn type="submit" variant="outlined" @click="deleteItem(selectionItem)">Xác nhận</v-btn>
        </div>
      </template>
    </dialog-base>
  </div>
</template>
