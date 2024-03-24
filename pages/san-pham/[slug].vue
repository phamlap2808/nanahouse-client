<script setup lang="ts">
  import type { IProduct } from 'define/product'
  import { Code } from 'define/response-code'

  const slug = useRoute().params.slug as string

  const selectedImg = ref<string>('')
  const quantity = ref<number>(1)
  const product = ref<IProduct>({
    id: 0,
    category_id: 0,
    category_name: '',
    origin_price: 0,
    friendly_price: 0,
    quantity: 0,
    availability: 0,
    discount: 0,
    title: '',
    SKU: '',
    description: '',
    og_title: '',
    og_description: '',
    og_image: '',
    og_url: '',
    image: [],
    thumbnail_id: 0,
    thumbnail: ''
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
    $toast().success(`Thêm ${product.value.title} vào giỏ hàng thành công`)
  }

  onMounted(() => {
    getProductDetail()
  })
</script>

<template>
  <div class="product-detail py-10">
    <v-row>
      <v-col xs="12" sm="12" md="6">
        <v-img :src="selectedImg" aspect-ratio="1" max-height="570" :cover="true" />
        <v-sheet class="mt-4">
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="(img, index) in listImages" :key="index">
              <div class="mr-2" :class="{ 'active-border': img === selectedImg }">
                <img
                  class="pointer max-w-20 w-full object-cover"
                  :src="img"
                  alt="list-img"
                  @click="handleSelectImg(img)" />
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col xs="12" sm="12" md="6">
        <div class="fs-26 fw-700 mb-4">{{ product.title }}</div>
        <div class="fs-22 fw-600 mb-10 text-green">
          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.origin_price) }}
        </div>
        <div class="flex item-center">
          <v-btn
            :flat="true"
            max-height="30"
            max-width="30"
            class="mr-2"
            icon="mdi-minus"
            @click="onHandleQuantity('minus')" />
          <div class="min-w-20 text-center">
            {{ quantity }}
          </div>
          <v-btn
            :flat="true"
            max-height="30"
            max-width="30"
            class="mx-2"
            icon="mdi-plus"
            @click="onHandleQuantity('plus')" />
          <v-btn class="ml-2" color="primary" @click="onHandleAddCart">Thêm vào giỏ hàng</v-btn>
        </div>
      </v-col>
    </v-row>
    <div class="mt-10">
      <div>Chi tiết sản phẩm:</div>
      <div v-html="product.description" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>