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
    console.log('cartStorage', cartStorage.value)
    loading.value = false
  })
</script>

<template>
  <div class="container py-10">
    <h2 class="text-center">Giỏ hàng</h2>
    <div v-if="!loading">
      <div class="px-2 py-2 rounded">
        <div v-for="item in cartStorage" :key="item.product_id" class="flex pt-4 items-center">
          <div class="basis-25">
            <img :src="item.image" alt="image-product" class="max-w-25 h-auto" />
          </div>
          <div class="flex flex-1 items-center">
            <div>{{ item.title }}</div>
            <div class="basis-25 text-center">
              {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }}
            </div>
            <div class="basis-25 flex items-center">
              <v-btn :flat="true" class="w-4 mr-4" @click="onHandleQuantity('minus', item.product_id)">-</v-btn>
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
              <v-btn :flat="true" class="w-4 ml-4" @click="onHandleQuantity('plus', item.product_id)">+</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
