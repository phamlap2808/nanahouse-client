<script setup lang="ts">
  const props = defineProps({
    productId: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    categoryName: {
      type: String,
      required: true
    },
    originalPrice: {
      type: Number,
      required: true
    },
    friendlyPrice: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  })

  const onRedirectToProductDetail = () => {
    navigateTo({ name: 'san-pham-slug', params: { slug: props.slug } })
  }

  const onAddProductToCart = (event: MouseEvent) => {
    event.stopPropagation()
    const cartStorage = $localStorage('get', 'cart_storage') as {
      product_id: number
      price: number
      amount: number
      image: string
      slug: string
      title: string
    }[]
    if (cartStorage) {
      const index = cartStorage.findIndex((item) => item.product_id === props.productId)
      if (index !== -1) {
        cartStorage[index].amount++
      } else {
        cartStorage.push({
          product_id: props.productId,
          price: props.friendlyPrice,
          amount: 1,
          image: props.thumbnail,
          slug: props.slug,
          title: props.productName
        })
      }
      $localStorage('set', 'cart_storage', cartStorage)
    } else {
      $localStorage('set', 'cart_storage', [
        {
          product_id: props.productId,
          price: props.friendlyPrice,
          amount: 1,
          image: props.thumbnail,
          slug: props.slug,
          title: props.productName
        }
      ])
    }
    $toast().success(`Thêm ${props.productName} vào giỏ hàng thành công`)
  }
</script>

<template>
  <div class="product-card px-4 py-4 rounded-3xl pointer" @click="onRedirectToProductDetail">
    <div class="w-full flex justify-center mb-4">
      <img :src="props.thumbnail" alt="thumbnail" class="w-52 h-52 object-cover" />
    </div>
    <div>
      <div class="fs-18 fw-500 mb-2">{{ props.productName }}</div>
      <div class="fw-600 line-through mb-2">
        {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.originalPrice) }}
      </div>
      <div class="fw-600 text-red mb-2">
        {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.friendlyPrice) }}
      </div>
      <div>
        <v-btn
          :flat="true"
          variant="tonal"
          prepend-icon="mdi-cart-heart"
          rounded="xl"
          @click="onAddProductToCart($event)"
          >Thêm vào giỏ hàng
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
