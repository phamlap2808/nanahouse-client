<script setup lang="ts">
  import type { IGroup } from 'define/user'
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
    },
    itemEdit: {
      type: Object as PropType<{ group_id: number; user_id: number }>,
      required: true
    }
  })

  const { isOpen } = toRefs(props)

  const loading = ref(false)
  const Form = ref()
  const groupList = ref<IGroup[]>([])

  const formData: { password: string; group_id: number } = reactive({
    password: '',
    group_id: props.itemEdit.group_id
  })

  const getGroupList = async () => {
    loading.value = true
    const res = await $axios.get($endpoint.groupList)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      groupList.value = data
    }
    loading.value = false
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const data = { id: props.itemEdit.user_id }
    if (formData.password) {
      Object.assign(data, { password: formData.password })
    }
    if (props.itemEdit.group_id !== formData.group_id) {
      Object.assign(data, { group_id: formData.group_id })
    }
    const res = await $axios.put($endpoint.userEdit, data)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Cập nhật tài khoản thành công')
      emits('refetch')
      props.toggleOpen(false)
    }
  }

  onMounted(() => {
    getGroupList()
  })
</script>
<template>
  <BaseDialog
    :is-open="isOpen"
    :toggle-open="toggleOpen"
    width="640px"
    title="Cập nhật tài khoản"
    button-text="Cập nhật"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="dialog-create-category">
        <v-form ref="Form" lazy-validation>
          <v-text-field
            v-model="formData.password"
            variant="outlined"
            class="mt-2"
            placeholder="Mật khẩu"
            :maxlength="225" />
          <v-select
            v-model="formData.group_id"
            :items="groupList"
            label="Nhóm"
            item-title="group_name"
            item-value="group_id"
            variant="outlined"
            class="mt-4" />
        </v-form>
      </div>
    </template>
  </BaseDialog>
</template>
