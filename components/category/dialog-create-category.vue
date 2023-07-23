<script setup lang="ts">
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

  const formData = reactive({
    name: ''
  })

  const rules = {
    name: [(v: any) => !!v || 'Tên danh mục không được bỏ trống']
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const res = await $axios.post($endpoint.categoryCreate, formData)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Tạo danh mục thành công')
      props.toggleOpen(false)
      emits('refecth')
    }
  }
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
          <v-text-field v-model="formData.name" :rules="rules.name" variant="outlined" class="mt-2" :maxlength="225" />
        </v-form>
      </div>
    </template>
  </BaseDialog>
</template>
