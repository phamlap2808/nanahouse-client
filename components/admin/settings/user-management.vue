<script setup lang="ts">
  import CreateUser from './create-user.vue'
  import EditUser from './edit-user.vue'
  import { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'
  import { IUser } from 'define/user'
  const usersList = ref<IUser[]>([])
  const loading = ref(false)
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const headers: IDataTableHeader[] = [
    {
      title: 'ID',
      align: 'start',
      sortable: false,
      key: 'user_id'
    },
    {
      title: 'Họ tên',
      align: 'start',
      sortable: false,
      key: 'user_name'
    },
    {
      title: 'Nhóm',
      align: 'start',
      sortable: false,
      key: 'group_name'
    },
    {
      title: 'Email',
      align: 'start',
      sortable: false,
      key: 'email'
    },
    {
      title: 'Sinh nhật',
      align: 'start',
      sortable: false,
      key: 'date_of_birth'
    },
    {
      title: '',
      align: 'end',
      sortable: false,
      key: 'actions'
    }
  ]

  const selectionItem = ref<{ user_id: number; group_id: number }>({
    user_id: 0,
    group_id: 0
  })

  const getUsersList = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.usersList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      usersList.value = data
    }
    loading.value = false
  }

  const toggleCreateModal = (value: boolean) => {
    showCreateModal.value = value
  }
  const toggleEditModal = (value: boolean) => {
    showEditModal.value = value
  }

  const editItem = (data: any) => {
    selectionItem.value.group_id = data.group_id
    selectionItem.value.user_id = data.user_id
    toggleEditModal(true)
  }

  const deleteItem = async (data: any) => {
    const params = new URLSearchParams({ id: data.user_id })
    const res = await $axios.delete($endpoint.userDelete, { params })
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xóa người dùng thành công')
      getUsersList()
    }
  }

  onMounted(() => {
    getUsersList()
  })
</script>
<template>
  <div class="user-management">
    <h1>Quản lý tài khoản</h1>
    <div class="flex justify-end mb-4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tạo tài khoản </v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table
        v-if="!loading"
        :headers="headers"
        :items="usersList"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1">
        <template #item.actions="{ item }">
          <v-icon
            v-if="![2].includes(item.raw.group_id)"
            size="small"
            class="me-2"
            icon="mdi-pencil"
            @click="editItem(item.raw)" />
          <v-icon
            v-if="![2].includes(item.raw.group_id)"
            size="small"
            icon="mdi-delete"
            @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>

    <CreateUser
      v-if="showCreateModal"
      :is-open="showCreateModal"
      :toggle-open="toggleCreateModal"
      @refetch="getUsersList" />
    <EditUser
      v-if="showEditModal"
      :is-open="showEditModal"
      :toggle-open="toggleEditModal"
      :item-edit="selectionItem"
      @refetch="getUsersList" />
  </div>
</template>
