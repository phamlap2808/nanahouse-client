<script setup lang="ts">
  import { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'
  import { IUser } from 'define/user'
  const usersList = ref<IUser[]>([])
  const loading = ref(false)
  const headers: IDataTableHeader[] = [
    {
      title: 'ID',
      align: 'start',
      sortable: false,
      key: 'user_id'
    },
    {
      title: 'Ho ten',
      align: 'start',
      sortable: false,
      key: 'user_name'
    },
    {
      title: 'Nhom',
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
      title: 'Sinh nhat',
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

  const getUsersList = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.usersList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      usersList.value = data
    }
    loading.value = false
  }

  const toggleCreateModal = () => {
    console.log('11111111111111')
  }

  const editItem = (data: any) => {
    console.log('11111111111111')
  }

  const deleteItem = (data: any) => {
    console.log('11111111111111')
  }

  onMounted(() => {
    getUsersList()
  })
</script>
<template>
  <div class="user-management">
    <h1>Quản lý tài khoản</h1>
    <div class="flex justify-end mb-4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tao tai khoan </v-btn>
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
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="editItem(item.raw)" />
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>
  </div>
</template>
