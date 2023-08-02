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
    },
    itemEdit: {
      type: Object as PropType<{
        id: number
        name: string
        group_id: string
        date_of_birth: string
        phone: string
        password: string
      }>,
      required: true
    }
  })

  const { isOpen } = toRefs(props)

  const loading = ref(false)
  const Form = ref()

  const formData: {
    id: number
    name: string
    group_id: string
    date_of_birth: string
    phone: string
    password: string
  } = reactive({
    id: props.itemEdit.id,
    name: props.itemEdit.name,
    group_id: props.itemEdit.group_id,
    date_of_birth: props.itemEdit.date_of_birth,
    phone: props.itemEdit.phone,
    password: props.itemEdit.password
  })

  const rules = {
    name: [(v: any) => !!v || 'Tên không được bỏ trống'],
    password: [(v: any) => !!v || 'Mật khẩu không được bỏ trống']
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const data = { id: props.itemEdit.id }
    if (props.itemEdit.name !== formData.name) {
      Object.assign(data, { name: formData.name })
    }
    if (props.itemEdit.group_id !== formData.group_id) {
      Object.assign(data, { group_id: formData.group_id })
    }
    if (props.itemEdit.date_of_birth !== formData.date_of_birth) {
      Object.assign(data, { date_of_birth: formData.date_of_birth })
    }
    if (props.itemEdit.phone !== formData.phone) {
      Object.assign(data, { phone: formData.phone })
    }
    if (props.itemEdit.password !== formData.password) {
      Object.assign(data, { password: formData.password })
    }
    const res = await $axios.put($endpoint.userEdit, data)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Chỉnh sửa nhóm thành công')
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
    title="Chỉnh sửa user"
    button-text="Chỉnh sửa"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="dialog-create-category">
        <v-form ref="Form" lazy-validation>
          <v-text-field
            v-model="formData.name"
            label="Tên"
            :rules="rules.name"
            variant="outlined"
            class="mt-2"
            :maxlength="225" />
        </v-form>
      </div>
    </template>
  </BaseDialog>
</template>
