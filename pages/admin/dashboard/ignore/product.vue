<script setup lang="ts">
import type { IProduct } from '../../../../define/product'
import { useDashboardStore } from '../../../../store'

interface TProps {
  product: IProduct
}

interface ICart {
  adminCart: {
    product_id: number
    price: number
    amount: number
    image: string
    slug: string
    title: string
  }[]
}

const props = withDefaults(defineProps<TProps>(), {})

const { product } = toRefs(props)

const cart = computed({
  get(): ICart['adminCart'] {
    return useDashboardStore().getAdminCart
  },
  set(value: ICart['adminCart']) {
    useDashboardStore().setAdminCart(value)
  }
})


const onHandleAddCart = () => {
  const productId = product.value.id
  const price = product.value.friendly_price
  const amount = 1
  const image = product.value.thumbnail
  const slug = product.value.og_url
  const title = product.value.title
  const index = cart.value.findIndex((item) => item.product_id === productId)
  if (index === -1) {
    cart.value.push({ product_id: productId, price, amount, image, slug, title })
  } else {
    cart.value[index].amount += amount
  }
}
</script>

<template>
  <div class="dashboard-page-wrapper__body-product--item">
    <div class="dashboard-page-wrapper__body-product--item__header">
      <div class="dashboard-page-wrapper__body-product--item__header--image">
        <img :src="product.thumbnail" alt="product" />
      </div>
    </div>
    <div class="dashboard-page-wrapper__body-product--item__body">
      <div class="dashboard-page-wrapper__body-product--item__body--status">{{ product.title }}</div>
      <div class="dashboard-page-wrapper__body-product--item__body--status">Giá: {{  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.origin_price) }}</div>
    </div>
    <div class="dashboard-page-wrapper__body-product--item__footer">
      <v-btn variant="outlined" rounded="24" text="Thêm vào giỏ hàng" @click="onHandleAddCart" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-page-wrapper__body-product--item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 16px;
  &__header {
    display: flex;
    padding: 16px;
    justify-content: center;
    &--image {
      max-width: 200px;
      max-height: 200px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 16px;
      &__name {
        font-size: 18px;
        font-weight: 500;
      }
      &__price {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  &__body {
    padding: 16px;
    &--status {
      font-size: 16px;
      font-weight: 400;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
}
</style>