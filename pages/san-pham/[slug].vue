<script setup lang="ts">
  import type { IProduct } from '../../define/product'
  import { Code } from '../../define/response-code'

  const slug = useRoute().params.slug as string

  const selectedImg = ref<string>('')
  const quantity = ref<number>(1)
  const product = ref<IProduct>({
    title: '',
    description: '',
    category_id: 0,
    origin_price: 0,
    friendly_price: 0,
    quantity: 0,
    availability: 1,
    thumbnail: '',
    image: [],
    og_title: '',
    og_description: '',
    og_url: '',
    id: 0,
    category_name: '',
    discount: 0,
    og_image: '',
    thumbnail_id: 0
  })
  const listImages = ref<string[]>([])
  const getProductDetail = async () => {
    listImages.value = []
    const params = new URLSearchParams({
      slug
    })
    const res = await $axios.get($endpoint.productDetail, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      product.value = data
      listImages.value.push(data.thumbnail)
      data.image.forEach((item: { image: string }) => {
        listImages.value.push(item.image)
      })
      selectedImg.value = listImages.value[0]
    }
  }

  const handleSelectImg = (img: string) => {
    selectedImg.value = img
  }

  const onHandleQuantity = (type: string) => {
    if (quantity.value === 1 && type === 'minus') return
    type === 'plus' ? quantity.value++ : quantity.value--
  }

  const onHandleAddCart = () => {
    const cartStorage = $localStorage('get', 'cart_storage') as {
      product_id: number
      price: number
      amount: number
      image: string
      slug: string
      title: string
    }[]
    const productId = product.value.id
    const price = product.value.friendly_price
    const amount = quantity.value
    const image = product.value.thumbnail
    const slug = product.value.og_url
    const title = product.value.title
    const index = cartStorage.findIndex((item) => item.product_id === productId)
    if (index === -1) {
      cartStorage.push({ product_id: productId, price, amount, image, slug, title })
    } else {
      cartStorage[index].amount += amount
    }
    $localStorage('set', 'cart_storage', cartStorage)
  }

  onMounted(() => {
    getProductDetail()
  })
</script>

<template>
  <div class="product-detail py-10">
    <v-row>
      <v-col xs="12" sm="12" md="6">
        <v-img :src="selectedImg" aspect-ratio="1" max-height="570" />
        <v-sheet class="mt-4">
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="(img, index) in listImages" :key="index">
              <img
                class="pointer max-h-20 max-w-20 w-full mr-2"
                :src="img"
                alt="list-img"
                @click="handleSelectImg(img)" />
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col xs="12" sm="12" md="6">
        <h1>{{ product.title }}</h1>
        <h3>
          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.origin_price) }}
        </h3>
        <div>Chi tiết sản phẩm:</div>
        <div v-html="product.description" />
        <div class="flex item-center">
          <v-btn :flat="true" class="w-4 mr-4" @click="onHandleQuantity('minus')">-</v-btn>
          <div class="max-w-20">
            <v-text-field
              v-model="quantity"
              type="number"
              variant="outlined"
              placeholder="Số lượng"
              :flat="true"
              :readonly="true"
              hide-details />
          </div>
          <v-btn :flat="true" class="w-4 mx-4" @click="onHandleQuantity('plus')">+</v-btn>
          <v-btn class="ml-2" color="primary" @click="onHandleAddCart">Thêm vào giỏ hàng</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss"></style>
