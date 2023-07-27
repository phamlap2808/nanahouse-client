<script setup lang="ts">
  const Form = ref()
  const formData = reactive({
    title: '',
    description: '',
    category_id: 0,
    origin_price: 0,
    friendly_price: 0,
    quantity: 0,
    availability: 0
  })
  const availabilityList = [
    { id: 0, title: 'Hết hàng' },
    { id: 1, title: 'Còn hàng' }
  ]
  const rules = {
    title: [(v: any) => !!v || 'Tên sản phẩm không được bỏ trống']
  }

  const onSubmit = () => {
    console.log('111111111111111')
  }
</script>

<template>
  <div class="product-editor p-4">
    <v-form ref="Form" @submit.prevent="onSubmit">
      <h2>Thông tin sản phẩm</h2>
      <v-text-field
        v-model="formData.title"
        :rules="rules.title"
        label="Tên sản phẩm"
        variant="outlined"
        class="my-2"
        :maxlength="225" />
      <ClientOnly>
        <QuillEditor theme="snow" toolbar="minimal" class="h-50" />
      </ClientOnly>
      <v-select v-model="formData.category_id" label="Danh mục" variant="outlined" class="mt-4" />
      <v-text-field
        v-model="formData.origin_price"
        :rules="rules.title"
        label="Giá gốc"
        variant="outlined"
        class="my-2"
        :maxlength="225" />
      <v-text-field
        v-model="formData.friendly_price"
        :rules="rules.title"
        label="Giá thành viên"
        variant="outlined"
        class="my-2"
        :maxlength="225" />
      <v-text-field
        v-model="formData.quantity"
        :rules="rules.title"
        label="Số lượng"
        variant="outlined"
        class="my-2"
        :maxlength="225" />
      <v-select
        v-model="formData.availability"
        :items="availabilityList"
        item-title="title"
        item-value="id"
        label="Tình trạng"
        variant="outlined"
        class="mt-4" />
      <h2>Thông tin SEO</h2>
    </v-form>
  </div>
</template>
