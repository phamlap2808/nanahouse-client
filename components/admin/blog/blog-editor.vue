<script setup lang="ts">
  import type { IBlogCreate } from 'define/blog'
  import type { PropType } from 'vue'
  import ImageCropper from 'components/dialog/ImageCropper.vue'
  import { regexSlug } from 'constant/regex'
  import { Code } from 'define/response-code'

  const emits = defineEmits(['create', 'edit'])

  const props = defineProps({
    data: {
      type: Object as PropType<IBlogCreate>,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  })

  const Form = ref()
  const formData: IBlogCreate = reactive(JSON.parse(JSON.stringify(props.data)))
  const uploadThumbnail = ref()
  const imgCropper = ref<string>('')
  const isOpenImgCropper = ref(false)
  const statusList = [
    { id: 1, title: 'Đóng' },
    { id: 2, title: 'Mở' }
  ]

  const rules = {
    title: [(v: string) => !!v || 'Tên bài viết không được bỏ trống'],
    slug: [
      (v: string) => !!v || 'Tình trạng sản phẩm không được bỏ trống',
      (v: string) => regexSlug.test(v) || 'Slug không đúng định dạng'
    ]
  }

  const toggleOpenImgCropper = (value: boolean) => {
    if (!value) {
      imgCropper.value = ''
    }
    isOpenImgCropper.value = value
  }

  const onUploadThumbnail = () => {
    uploadThumbnail.value?.click()
  }

  const onHandlerThumbnail = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      const file = target.files[0]
      const maxSize = 5 * 1024 * 1024
      const allowedTypes = ['image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        $toast().error('Hình ảnh sai định dạng')
        return
      }
      if (file.size > maxSize) {
        $toast().error('Hình ảnh không được qua 5mb')
        return
      }
      imgCropper.value = URL.createObjectURL(file)
      isOpenImgCropper.value = true
    }
  }

  const CropImage = (canvas: HTMLCanvasElement) => {
    imgCropper.value = ''
    canvas.toBlob((blob: any) => {
      formData.thumbnail = blob
    })
  }

  const loadImg = (img: string | Blob | { id: number; image: string }) => {
    if ($helper.isBlob(img)) {
      return URL.createObjectURL(img)
    } else if (typeof img === 'string') {
      return img
    } else {
      return img.image
    }
  }

  const onRemoveThumbnail = () => {
    formData.thumbnail = ''
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    if (props.mode === 'create') {
      emits('create', formData)
      return
    }
    if (props.mode === 'edit') {
      emits('edit', formData)
    }
  }
</script>

<template>
  <div class="blog-editor min-h-100vn">
    <v-form ref="Form" @submit.prevent="onSubmit">
      <h2>Thông tin bài viết</h2>
      <v-text-field
        v-model="formData.title"
        :rules="rules.title"
        label="Tên bài viết"
        variant="outlined"
        class="my-2"
        :maxlength="225" />
      <div class="product-editor__thumbnail mb-4">
        <h4 class="mb-2">Ảnh đại diện</h4>
        <div v-if="!formData.thumbnail" class="size-50 rounded-3xl border flex pointer" @click="onUploadThumbnail">
          <div class="m-auto">
            <v-icon size="48" icon="mdi-upload" />
            <div>Tải ảnh</div>
          </div>
        </div>
        <div v-else>
          <div class="size-50 relative">
            <v-icon
              size="small"
              icon="mdi-close-circle absolute top-16px right-16px pointer"
              @click="onRemoveThumbnail" />
            <img :src="loadImg(formData.thumbnail)" alt="thubnail" class="size-50 rounded-3xl" />
          </div>
        </div>
        <input ref="uploadThumbnail" type="file" multiple="false" class="hidden" @change="onHandlerThumbnail" />
      </div>
      <ClientOnly>
        <QuillEditor v-model:content="formData.content" theme="snow" toolbar="full" class="h-80" content-type="html" />
      </ClientOnly>
      <v-text-field v-model="formData.description" label="Mô tả" variant="outlined" class="my-2" :maxlength="225" />
      <v-select
        v-model="formData.status"
        :items="statusList"
        item-title="title"
        item-value="id"
        label="Tình trạng"
        variant="outlined"
        class="mt-4" />
      <h2>Thông tin SEO</h2>
      <v-text-field
        v-model="formData.og_url"
        :rules="rules.slug"
        label="Slug"
        variant="outlined"
        class="my-2"
        :maxlength="225" />
      <v-text-field v-model="formData.og_title" label="Tiêu đề" variant="outlined" class="my-2" :maxlength="225" />
      <v-text-field v-model="formData.og_description" label="Mô tả" variant="outlined" class="my-2" :maxlength="225" />
      <div class="flex justify-end">
        <v-btn type="submit" variant="outlined" class="text-center">
          {{ props.mode === 'create' ? 'Tạo' : 'Chỉnh sửa' }}
        </v-btn>
      </div>
    </v-form>
    <ImageCropper
      v-if="isOpenImgCropper && imgCropper"
      :is-open="isOpenImgCropper"
      :toggle-open="toggleOpenImgCropper"
      :img-src="imgCropper"
      :stencil="{
        aspectRatio: 4 / 3
      }"
      stencil-type="rectangle"
      @crop-image="CropImage" />
  </div>
</template>
