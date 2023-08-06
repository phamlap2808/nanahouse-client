<script setup lang="ts">
  import CreateGroup from './create-group.vue'
  import EditGroup from './edit-group.vue'
  import { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'
  import { IGroup } from 'define/user'

  const groupList = ref<IGroup[]>([])
  const loading = ref(false)
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const headers: IDataTableHeader[] = [
    {
      title: 'ID',
      align: 'start',
      sortable: false,
      key: 'group_id'
    },
    {
      title: 'Nhóm',
      align: 'start',
      sortable: false,
      key: 'group_name'
    },
    {
      title: '',
      align: 'end',
      sortable: false,
      key: 'actions'
    }
  ]
  const selectionItem = ref<{ group_id: number; group_name: string; permissions: number[] }>({
    group_id: 0,
    group_name: '',
    permissions: []
  })

  const toggleCreateModal = (value: boolean) => {
    showCreateModal.value = value
  }
  const toggleEditModal = (value: boolean) => {
    showEditModal.value = value
  }

  const getGroupList = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.groupList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      groupList.value = data
    }
    loading.value = false
  }

  const editItem = (data: any) => {
    selectionItem.value.group_id = data.group_id
    selectionItem.value.group_name = data.group_name
    const temp: number[] = []
    data.permissions.forEach((e: { id: number; name: string }) => {
      temp.push(e.id)
    })
    selectionItem.value.permissions = temp
    toggleEditModal(true)
  }

  const deleteItem = async (data: any) => {
    const params = new URLSearchParams({ id: data.group_id })
    const res = await $axios.delete($endpoint.groupDelete, { params })
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa danh mục thành công')
      getGroupList()
    }
  }

  onMounted(() => {
    getGroupList()
  })
</script>
<template>
  <div class="group-management">
    <h1>Quản lý nhóm</h1>
    <div class="flex justify-end mb-4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tạo nhóm </v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table
        v-if="!loading"
        :headers="headers"
        :items="groupList"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1">
        <template #item.actions="{ item }">
          <v-icon
            v-if="![1, 2].includes(item.raw.group_id)"
            size="small"
            class="me-2"
            icon="mdi-pencil"
            @click="editItem(item.raw)" />
          <v-icon
            v-if="![1, 2].includes(item.raw.group_id)"
            size="small"
            icon="mdi-delete"
            @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>
    <CreateGroup
      v-if="showCreateModal"
      :is-open="showCreateModal"
      :toggle-open="toggleCreateModal"
      @refecth="getGroupList" />
    <EditGroup
      v-if="showEditModal"
      :is-open="showEditModal"
      :toggle-open="toggleEditModal"
      :item-edit="selectionItem"
      @refecth="getGroupList" />
  </div>
</template>
