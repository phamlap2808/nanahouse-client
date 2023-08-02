<script setup lang="ts">
  import BaseDialog from 'components/dialog/base-dialog.vue'
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

  const formData: { email: string; password: string } = reactive({
    email: '',
    password: ''
  })

  const rules = {
    email: [(v: any) => !!v || 'Email không được bỏ trống'],
    password: [(v: any) => !!v || 'Mật khẩu không được bỏ trống']
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const res = await $axios.post($endpoint.userCreate, formData)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Tạo User thành công')
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
    title="Tạo User"
    button-text="Tạo"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="dialog-create-category">
        <v-form ref="Form" lazy-validation>
          <v-text-field
            v-model="formData.email"
            :rules="rules.email"
            variant="outlined"
            class="mt-2"
            :maxlength="225" />
          <v-text-field
            v-model="formData.password"
            :rules="rules.password"
            variant="outlined"
            class="mt-2"
            :maxlength="225" />
        </v-form>
      </div>
    </template>
  </BaseDialog>
</template>
