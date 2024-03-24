<script setup lang="ts">
  import type { PropType } from 'vue'
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
      type: Object as PropType<{ group_id: number; group_name: string; permissions: number[] }>,
      required: true
    }
  })

  const { isOpen } = toRefs(props)

  const loading = ref(false)
  const Form = ref()

  const formData: { id: number; name_group: string; permissions: number[] } = reactive({
    id: props.itemEdit.group_id,
    name_group: props.itemEdit.group_name,
    permissions: props.itemEdit.permissions
  })

  const rules = {
    name_group: [(v: any) => !!v || 'Tên nhóm không được bỏ trống']
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const data = { id: formData.id, permissions: formData.permissions }
    if (props.itemEdit.group_name !== formData.name_group) {
      Object.assign(data, { name_group: formData.name_group })
    }
    const res = await $axios.put($endpoint.groupEdit, data)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Update nhóm thành công')
      emits('refetch')
      props.toggleOpen(false)
    }
  }
</script>
<template>
  <dialog-base
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
            placeholder="Tên nhóm"
            :maxlength="225" />
          <h3>Phân quyền</h3>
          <v-checkbox
            v-for="item in permissions"
            :key="item.id"
            v-model="formData.permissions"
            :value="item.id"
            :label="item.title"
            hide-details />
        </v-form>
      </div>
    </template>
  </dialog-base>
</template>
