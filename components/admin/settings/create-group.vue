<script setup lang="ts">
  import BaseDialog from 'components/dialog/base-dialog.vue'
  import { permissions } from 'define/permissions'
  import { Code } from 'define/response-code'

  const emits = defineEmits(['refetch'])
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

  const { isOpen } = toRefs(props)

  const loading = ref(false)
  const Form = ref()

  const formData: { name_group: string; permissions: number[] } = reactive({
    email: '',
    password: ''
  })

  const rules = {
    name_group: [(v: any) => !!v || 'Tên nhóm không được bỏ trống']
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const res = await $axios.post($endpoint.groupCreate, formData)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Tạo nhóm thành công')
      props.toggleOpen(false)
      emits('refetch')
    }
  }
</script>
<template>
  <BaseDialog
    :is-open="isOpen"
    :toggle-open="toggleOpen"
    width="640px"
    title="Tạo nhóm"
    button-text="Tạo"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="dialog-create-category">
        <v-form ref="Form" lazy-validation>
          <v-text-field
            v-model="formData.name_group"
            :rules="rules.name_group"
            variant="outlined"
            class="mt-2"
            :maxlength="225" />
          <v-text-field
            v-model="formData.name_group"
            :rules="rules.name_group"
            variant="outlined"
            class="mt-2"
            :maxlength="225" />
        </v-form>
      </div>
    </template>
  </BaseDialog>
</template>
