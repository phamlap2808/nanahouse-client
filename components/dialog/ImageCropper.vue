<script lang="ts" setup>
  import BaseDialog from './base-dialog.vue'
  import { CircleStencil, RectangleStencil } from 'vue-advanced-cropper'

  const emits = defineEmits(['cropImage'])

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    toggleOpen: {
      type: Function,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    stencil: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    canvasOption: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    stencilType: {
      type: String,
      required: false,
      default: 'circle'
    }
  })

  const cropper = ref()

  const stencilType = ref(props.stencilType === 'circle' ? markRaw(CircleStencil) : markRaw(RectangleStencil))

  const { isOpen, toggleOpen, imgSrc, stencil, canvasOption } = toRefs(props)

  const onSubmit = () => {
    const { canvas } = cropper.value.getResult()
    emits('cropImage', canvas)
    props.toggleOpen(false)
  }
</script>
<template>
  <BaseDialog
    :is-open="isOpen"
    :toggle-open="toggleOpen"
    width="1000px"
    button-text="Cắt ảnh"
    :callback-function="onSubmit">
    <template #main>
      <div class="image-cropper">
        <Cropper
          ref="cropper"
          :src="imgSrc"
          v-bind="$attrs"
          :stencil-props="stencil"
          :stencil-component="stencilType"
          :canvas="canvasOption"
          image-restriction="fit-area" />
      </div>
    </template>
  </BaseDialog>
</template>
