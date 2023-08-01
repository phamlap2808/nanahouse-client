<script setup lang="ts">
  import { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'
  import { IGroup } from 'define/user'

  const groupList = ref<IGroup[]>([])
  const loading = ref(false)
  const headers: IDataTableHeader[] = [
    {
      title: 'ID',
      align: 'start',
      sortable: false,
      key: 'group_id'
    },
    {
      title: 'Nhom',
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

  const getGroupList = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.groupList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      groupList.value = data
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
    getGroupList()
  })
</script>
<template>
  <div class="group-management">
    <h1>Quản lý nhóm</h1>
    <div class="flex justify-end mb-4">
      <v-btn type="submit" variant="outlined" class="text-center" @click="toggleCreateModal"> Tao tai khoan </v-btn>
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
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="editItem(item.raw)" />
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>
  </div>
</template>
