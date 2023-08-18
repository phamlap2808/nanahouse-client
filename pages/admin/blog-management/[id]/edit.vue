<script setup lang="ts">
  import type { IBlogCreate } from 'define/blog'
  import BlogEditor from 'components/admin/blog/blog-editor.vue'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'admin'
  })

  const loading = ref(true)
  let formData: IBlogCreate = reactive({
    content: '',
    description: '',
    og_description: '',
    og_title: '',
    og_url: '',
    status: 1,
    thumbnail: '',
    title: ''
  })

  const getBlogDetail = async () => {
    loading.value = true
    const params = new URLSearchParams({ id: useRoute().params.id as string })
    const res = await $axios.get($endpoint.blogDetail, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      formData = data
    }
    loading.value = false
  }

  const onEditBlog = async (data: IBlogCreate) => {
    const form = new FormData()
    form.append('id', useRoute().params.id as string)
    if (data.title !== formData.title) {
      form.append('title', data.title)
    }
    if (data.content !== formData.content) {
      form.append('content', data.content)
    }
    if (data.status !== formData.status) {
      form.append('status', data.status.toString())
    }
    if (data.description !== formData.description) {
      form.append('description', data.description)
    }
    if (data.thumbnail !== formData.thumbnail) {
      form.append('thumbnail', data.thumbnail)
    }
    if (data.og_title !== formData.og_title) {
      form.append('og_title', data.og_title)
    }
    if (data.og_description !== formData.og_description) {
      form.append('og_description', data.og_description)
    }
    if (data.og_url !== formData.og_url) {
      form.append('og_url', data.og_url)
    }

    const res = await $axios.post($endpoint.blogEdit, form)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Chỉnh sứa bài viết thành công')
      getBlogDetail()
    }
  }

  onMounted(() => {
    getBlogDetail()
  })
</script>

<template>
  <div class="blog-create p-4">
    <h1>Chỉnh sửa bài viết</h1>
    <BlogEditor v-if="!loading" :data="formData" mode="edit" @edit="onEditBlog" />
  </div>
</template>
