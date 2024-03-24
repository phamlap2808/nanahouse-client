<script setup lang="ts">
  const loading = ref(true)
  const cartStorage = ref<{ product_id: number; price: number; amount: number; image: string; title: string }[]>([])

  const onHandleQuantity = (type: string, id: number) => {
    const temp = cartStorage.value
    const index = temp.findIndex((item) => item.product_id === id)
    if (index !== -1) {
      if (type === 'plus') {
        temp[index].amount++
      } else {
        temp[index].amount--
      }
      cartStorage.value = temp
      $localStorage('set', 'cart_storage', temp)
    }
  }

  const handleDeleteProduct = (id: number) => {
    const temp = cartStorage.value
    const index = temp.findIndex((item) => item.product_id === id)
    if (index !== -1) {
      temp.splice(index, 1)
      cartStorage.value = temp
      $localStorage('set', 'cart_storage', temp)
    }
  }

  const handleTotalPriceOnCart = computed(() => {
    let total = 0
    cartStorage.value.forEach((item) => {
      total += item.price * item.amount
    })
    return total
  })

  const onRedirect = (name) => {
    navigateTo({ name })
  }

  const handleAmountOnCart = computed(() => {
    let total = 0
    cartStorage.value.forEach((item) => {
      total += item.amount
    })
    return total
  })

  onMounted(() => {
    loading.value = true
    const temp = $localStorage('get', 'cart_storage') as {
      product_id: number
      price: number
      amount: number
      image: string
      slug: string
      title: string
    }[]
    if (temp) {
      cartStorage.value = temp
    }
    loading.value = false
  })
</script>

<template>
  <div class="container py-10">
    <h2 class="text-center mb-4">Giỏ hàng</h2>
    <div v-if="!loading && cartStorage.length > 0">
      <div class="px-2 py-2 rounded bg-white">
        <div v-for="item in cartStorage" :key="item.product_id" class="flex pt-4 items-center gap-4 border-bottom">
          <div class="w-25">
            <img :src="item.image" alt="image-product" class="max-w-25 h-auto" />
          </div>
          <div class="flex item-center grow">
            <div class="min-w-75">{{ item.title }}</div>
            <div class="min-w-25 text-center">
              {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }}
            </div>
            <div class="min-w-25 flex item-center">
              <v-btn
                variant="outlined"
                :flat="true"
                class="w-4 mr-4"
                height="60"
                @click="onHandleQuantity('minus', item.product_id)"
                >-
              </v-btn>
              <div class="w-full w-20">
                <v-text-field
                  v-model="item.amount"
                  type="number"
                  variant="outlined"
                  placeholder="Số lượng"
                  :flat="true"
                  :readonly="true"
                  hide-details />
              </div>
              <v-btn
                variant="outlined"
                height="60"
                :flat="true"
                class="w-4 ml-4"
                @click="onHandleQuantity('plus', item.product_id)"
                >+
              </v-btn>
            </div>
            <div class="min-w-25 text-center">
              {{
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.amount)
              }}
            </div>
          </div>
          <div class="item-center pt-39px pointer">
            <v-icon icon="mdi-trash-can-outline" @click="handleDeleteProduct(item.product_id)" />
          </div>
        </div>
        <div class="flex justify-end item-center p-4 fs-20 fw-700">
          <div class="min-w-25 text-center">Tạm tính</div>
          <div class="min-w-25 text-center">{{ handleAmountOnCart }}</div>
          <div class="min-w-25 text-center">
            {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(handleTotalPriceOnCart) }}
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-between item-center">
        <v-btn :flat="true" variant="outlined" @click="onRedirect('index')">Tiếp tục mua hàng</v-btn>
        <v-btn :flat="true" variant="outlined" @click="onRedirect('dat-hang')">Tiến hành đặt hàng</v-btn>
      </div>
    </div>
    <div v-if="!loading && cartStorage.length === 0" class="flex flex-col">
      <div class="min-h-100 flex justify-center item-center">Giỏ hàng trống</div>
      <v-btn :flat="true" variant="outlined" @click="onRedirect('index')">Vè trang chủ</v-btn>
    </div>
  </div>
</template>
