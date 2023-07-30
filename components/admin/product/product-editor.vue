<script setup lang="ts">
  import type { ISubCategory } from 'define/category'
  import type { IProductCreate } from 'define/product'
  import type { PropType } from 'vue'
  import ImageCropper from 'components/dialog/ImageCropper.vue'
  import { regexSlug } from 'constant/regex'
  import { Code } from 'define/response-code'

  const emits = defineEmits(['create', 'edit'])

  const props = defineProps({
    data: {
      type: Object as PropType<IProductCreate>,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  })

  const Form = ref()
  const formData: IProductCreate = reactive(props.data)
  const loading = ref(true)
  const uploadThumbnail = ref()
  const uploadListImage = ref()
  const imgCropper = ref<string>('')
  const isOpenImgCropper = ref(false)
  const listCategory = ref<ISubCategory[]>()
  const availabilityList = [
    { id: 0, title: 'Hết hàng' },
    { id: 1, title: 'Còn hàng' }
  ]
  const rules = {
    title: [(v: string) => !!v || 'Tên sản phẩm không được bỏ trống'],
    category_id: [(v: number) => !!v || 'Danh mục sản phẩm không được bỏ trống'],
    origin_price: [
      (v: string) => !!v || 'Giá gốc không được bỏ trống',
      (v: string) => Number.isInteger(Number.parseInt(v)) || 'Giá gốc có giá trị là số nguyên'
    ],
    friendly_price: [
      (v: string) => !!v || 'Giá thành viên không được bỏ trống',
      (v: string) => Number.isInteger(Number.parseInt(v)) || 'Giá thành viên có giá trị là số nguyên'
    ],
    quantity: [
      (v: string) => !!v || 'Số lượng không được bỏ trống',
      (v: string) => Number.isInteger(Number.parseInt(v)) || 'Số lượng có giá trị là số nguyên'
    ],
    availability: [(v: number) => !!v || 'Tình trạng sản phẩm không được bỏ trống'],
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

  const onUploadListImage = () => {
    uploadListImage.value?.click()
  }

  const getListCategory = async () => {
    const res = await $axios.get($endpoint.categoryList)
    const { status, code, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data
    }
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

  const onHandlerListImage = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      const files = Array.from(target.files)
      const maxSize = 5 * 1024 * 1024
      const allowedTypes = ['image/jpeg', 'image/png']
      files.forEach((item: File) => {
        if (!allowedTypes.includes(item.type)) {
          $toast().error(`${item.name} sai định dạng`)
          return
        }
        if (item.size > maxSize) {
          $toast().error(`${item.name} không được qua 5mb`)
          return
        }
        formData.images.push(item)
      })
    }
  }

  const CropImage = (canvas: HTMLCanvasElement) => {
    imgCropper.value = ''
    canvas.toBlob((blob: any) => {
      formData.thumbnail = blob
    })
  }

  const loadImg = (img: string | Blob) => {
    if (typeof img === 'string') {
      return img
    }
    return URL.createObjectURL(img)
  }

  const onRemoveThumbnail = () => {
    formData.thumbnail = ''
  }

  const onRemoveListImage = (index: number) => {
    formData.images.splice(index, 1)
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    if (props.mode === 'create') {
      emits('create', formData)
      return
    }
    console.log('edits')
  }

  onMounted(async () => {
    loading.value = true
    await getListCategory()
    loading.value = false
  })
</script>

<template>
  <div v-loading="loading" class="product-editor min-h-100vh p-4">
    <div v-if="!loading">
      <v-form ref="Form" @submit.prevent="onSubmit">
        <h2>Thông tin sản phẩm</h2>
        <v-text-field
          v-model="formData.title"
          :rules="rules.title"
          label="Tên sản phẩm"
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
        <div class="product-editor__list-image mb-4">
          <h4 class="mb-2">Thư viện ảnh</h4>
          <div class="flex flex-wrap">
            <div class="size-50 rounded-3xl border flex justify-center pointer mr-2" @click="onUploadListImage">
              <div class="m-auto">
                <v-icon size="48" icon="mdi-upload" />
                <div>Tải ảnh</div>
              </div>
            </div>
            <div v-for="(image, index) in formData.images" :key="index" class="relative">
              <v-icon
                size="small"
                icon="mdi-close-circle"
                class="absolute top-16px right-16px pointer"
                @click="onRemoveListImage(index)" />
              <img :src="loadImg(image)" class="size-50 rounded-3xl object-contain mr-2" />
            </div>
          </div>
          <input ref="uploadListImage" type="file" multiple class="hidden" @change="onHandlerListImage" />
        </div>
        <ClientOnly>
          <QuillEditor v-model="formData.description" theme="snow" toolbar="minimal" class="h-50" />
        </ClientOnly>
        <v-select
          v-model="formData.category_id"
          :items="listCategory"
          :rules="rules.category_id"
          label="Danh mục"
          item-title="category_name"
          item-value="category_id"
          variant="outlined"
          class="mt-4" />
        <v-text-field
          v-model="formData.origin_price"
          :rules="rules.origin_price"
          label="Giá gốc"
          variant="outlined"
          class="my-2"
          :maxlength="225" />
        <v-text-field
          v-model="formData.friendly_price"
          :rules="rules.friendly_price"
          label="Giá thành viên"
          variant="outlined"
          class="my-2"
          :maxlength="225" />
        <v-text-field
          v-model="formData.quantity"
          :rules="rules.quantity"
          label="Số lượng"
          variant="outlined"
          class="my-2"
          :maxlength="225" />
        <v-select
          v-model="formData.availability"
          :items="availabilityList"
          :rules="rules.availability"
          item-title="title"
          item-value="id"
          label="Tình trạng"
          variant="outlined"
          class="mt-4" />
        <h2>Thông tin SEO</h2>
        <v-text-field v-model="formData.og_title" label="Seo title" variant="outlined" class="my-2" :maxlength="225" />
        <v-text-field
          v-model="formData.og_description"
          label="Seo description"
          variant="outlined"
          class="my-2"
          :maxlength="225" />
        <v-text-field
          v-model="formData.og_url"
          :rules="rules.slug"
          label="Slug"
          variant="outlined"
          class="my-2"
          :maxlength="225" />
      </v-form>
      <ImageCropper
        v-if="isOpenImgCropper && imgCropper"
        :is-open="isOpenImgCropper"
        :toggle-open="toggleOpenImgCropper"
        :img-src="imgCropper"
        :stencil="{
          aspectRatio: 1 / 1
        }"
        stencil-type="rectangle"
        @crop-image="CropImage" />
    </div>
  </div>
</template>
