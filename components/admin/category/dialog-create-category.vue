<script setup lang="ts">
  import type { ICategory } from 'define/category'
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
    parent_id: null,
    sort: null
  })

  const rules = {
    name: [(v: any) => !!v || 'Tên danh mục không được bỏ trống']
  }

  const getListCategory = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.categoryAll)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data.map((item: any) => {
        return {
          category_id: item._id,
          category_name: item.name
        }
      })
    }
    loading.value = false
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const res = await $axios.post($endpoint.categoryCreate, formData)
    const { code, status, data } = res.data
    if (status && code === 201) {
      $toast().success('Tạo danh mục thành công')
      emits('refecth')
    }
  }

  onMounted(() => {
    getListCategory()
  })
</script>

<template>
  <dialog-base
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
          <v-text-field v-model="formData.sort" label="Thứ tự" variant="outlined" class="mt-2" type="number" />
        </v-form>
      </div>
    </template>
  </dialog-base>
</template>
