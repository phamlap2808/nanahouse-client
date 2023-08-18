<script setup lang="ts">
  import type { IBlogCreate } from 'define/blog'
  import BlogEditor from 'components/admin/blog/blog-editor.vue'
  import { Code } from 'define/response-code'
  definePageMeta({
    layout: 'admin'
  })

  const formData: IBlogCreate = reactive({
    content: '',
    description: '',
    og_description: '',
    og_title: '',
    og_url: '',
    status: 1,
    thumbnail: '',
    title: ''
  })

  const onCreateBlog = async (data: IBlogCreate) => {
    const form = new FormData()
    if (data.title) {
      form.append('title', data.title)
    }
    if (data.content) {
      form.append('content', data.content)
    }
    if (data.description) {
      form.append('description', data.description)
    }
    if (data.thumbnail) {
      form.append('thumbnail', data.thumbnail)
    }
    if (data.og_description) {
      form.append('og_description', data.og_description)
    }
    if (data.og_title) {
      form.append('og_title', data.og_title)
    }
    if (data.og_url) {
      form.append('og_url', data.og_url)
    }
    if (data.status) {
      form.append('status', data.status.toString())
    }

    const res = await $axios.post($endpoint.blogCreate, form)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Tạo bài viết thành công')
    }
  }
</script>

<template>
  <div class="blog-create px-4 py-4">
    <h1>Tạo bài viết mới</h1>
    <BlogEditor :data="formData" mode="create" @create="onCreateBlog" />
  </div>
</template>
