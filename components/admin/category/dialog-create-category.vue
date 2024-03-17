<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import BaseDialog from 'components/dialog/base-dialog.vue'
  import { Code } from 'define/response-code'

  const emits = defineEmits(['refecth'])
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    toggleOpen: {
      type: Function,
      required: true
    }
  })

  const loading = ref(false)
  const Form = ref()
  const { isOpen } = toRefs(props)
  const listCategory = ref<ICategory[]>([])

  const formData = reactive({
    name: '',
    parent_id: null
  })

  const rules = {
    name: [(v: any) => !!v || 'Tên danh mục không được bỏ trống']
  }

  const getListCategory = async () => {
    loading.value = true
    const params = new URLSearchParams({
      raw: '1'
    })
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data
    }
    loading.value = false
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const res = await $axios.post($endpoint.categoryCreate, formData)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      $toast().success('Tạo danh mục thành công')
      emits('refecth')
    }
  }

  onMounted(() => {
    getListCategory()
  })
</script>

<template>
  <BaseDialog
    :is-open="isOpen"
    :toggle-open="toggleOpen"
    width="640px"
    title="Tạo danh mục"
    button-text="Tạo"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="dialog-create-category">
        <v-form ref="Form" lazy-validation>
          <v-text-field
            v-model="formData.name"
            :rules="rules.name"
            label="Tên danh mục"
            variant="outlined"
            class="mt-2"
            :maxlength="225" />
          <v-select
            v-model="formData.parent_id"
            :items="listCategory"
            label="Danh mục cha"
            item-title="category_name"
            item-value="category_id"
            variant="outlined"
            class="mt-4" />
        </v-form>
      </div>
    </template>
  </BaseDialog>
</template>
