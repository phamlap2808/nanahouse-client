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
    }
  })

  const { isOpen } = toRefs(props)

  const loading = ref(false)
  const Form = ref()
  const groupList = ref<IGroup[]>([])

  const formData: { email: string; password: string; group_id: number } = reactive({
    email: '',
    password: '',
    group_id: 1
  })

  const rules = {
    email: [(v: any) => !!v || 'Email không được bỏ trống'],
    password: [(v: any) => !!v || 'Mật khẩu không được bỏ trống']
  }

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
    const res = await $axios.post($endpoint.userCreate, formData)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Tạo User thành công')
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
            placeholder="Email"
            :maxlength="225" />
          <v-text-field
            v-model="formData.password"
            :rules="rules.password"
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
