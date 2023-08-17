<script setup lang="ts">
  import { IBlog } from 'define/blog'
  import { IDataTableHeader } from 'define/data-table'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const loading = ref(false)
  const listBlog = ref<IBlog[]>([])
  const headers: IDataTableHeader[] = [
    {
      title: 'Tên bài viết',
      align: 'start',
      key: 'title'
    },
    {
      title: 'Hình ảnh',
      align: 'start',
      key: 'thumbnail'
    },
    {
      title: 'Mô tả',
      align: 'start',
      key: 'description'
    },
    {
      title: 'Tình trạng',
      align: 'start',
      key: 'status'
    },
    {
      title: '',
      align: 'end',
      sortable: false,
      key: 'actions'
    }
  ]

  const getListBlog = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.blogList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listBlog.value = data.blogs_list
    }
    loading.value = false
  }

  const editItem = (data: any) => {
    // navigateTo({ name: 'admin-product-management-id-edit', params: { id: data.id } })
  }

  const deleteItem = async (data: any) => {
    // const params = new URLSearchParams({ id: data.id })
    // const res = await $axios.delete($endpoint.productDelete, { params })
    // const { code, status } = res.data
    // if (status && code === Code.Success) {
    //   $toast().success('Xóa sản phẩm thành công')
    //   getListProduct()
    // }
  }

  onMounted(() => {
    getListBlog()
  })
</script>

<template>
  <div class="blog-page p-4">
    <h1>Quản lý bài viết</h1>
    <div class="flex justify-end mb4">
      <v-btn type="submit" variant="outlined" class="text-center">Tạo bài viết</v-btn>
    </div>
    <div v-loading="loading" class="min-h-100">
      <v-data-table
        v-if="!loading"
        :headers="headers"
        :items="listBlog"
        :loading="loading"
        loading-text="Tải dữ liệu"
        class="elevation-1">
        <template #item.thumbnail="{ item }">
          <img :src="item.raw.thumbnail" class="size-14" :alt="item.raw.thumbnail" />
        </template>
        <template #item.actions="{ item }">
          <v-icon size="small" class="me-2" icon="mdi-pencil" @click="editItem(item.raw)" />
          <v-icon size="small" icon="mdi-delete" @click="deleteItem(item.raw)" />
        </template>
      </v-data-table>
    </div>
  </div>
</template>
