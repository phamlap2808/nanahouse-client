<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import type { PropType } from 'vue'
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
    },
    itemEdit: {
      type: Object as PropType<{ category_id: number; category_name: string; parent_id: number | null }>,
      required: true
    }
  })

  const loading = ref(false)
  const Form = ref()
  const { isOpen } = toRefs(props)
  const listCategory = ref<ICategory[]>([])

  const formData = reactive({
    category_id: props.itemEdit.category_id,
    category_name: props.itemEdit.category_name,
    parent_id: props.itemEdit.parent_id
  })

  const rules = {
    name: [(v: any) => !!v || 'Tên danh mục không được bỏ trống']
  }

  const getListCategory = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.categoryList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      const temp: ICategory[] = data
      temp.forEach((item: ICategory) => {
        if (formData.category_id !== item.category_id) {
          listCategory.value.push(item)
        }
      })
    }
    loading.value = false
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const data = { category_id: formData.category_id, category_name: formData.category_name }
    if (props.itemEdit.parent_id !== formData.parent_id) {
      Object.assign(data, { parent_id: formData.parent_id })
    }
    const res = await $axios.put($endpoint.categoryEdit, data)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Chỉnh sửa danh mục thành công')
      props.toggleOpen(false)
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
    title="Chỉnh sửa danh mục"
    button-text="Chỉnh sửa"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="dialog-create-category">
        <v-form ref="Form" lazy-validation>
          <v-text-field
            v-model="formData.category_name"
            :rules="rules.name"
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
