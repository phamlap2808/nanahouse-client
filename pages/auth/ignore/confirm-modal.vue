<script setup lang="ts">
  const emits = defineEmits(['onClose'])
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    }
  })

  const onCloseModel = () => {
    emits('onClose')
  }
</script>

<template>
  <v-dialog :value="props.isOpen" activator="parent" width="auto">
    <v-card>
      <v-card-text>Vui lòng kiểm tra email để xác nhận tài </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn variant="outlined" @click="onCloseModel">Xác nhận</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
