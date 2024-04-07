<script setup lang="ts">
  import { useDashboardStore } from '../../../../store'
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

  const formData: {
    name: string
    phone: string
    address: string
    type_of_customer: number
    email: string
    order: { product_id: number; price: number; amount: number }[]
  } = reactive({
    name: 'nanahouse',
    phone: '0383555093',
    address: 'Mua tại shop',
    type_of_customer: 1,
    email: 'nanohuynh97@gmail.com',
    order: []
  })

  const cart = computed({
    get(): ICart['adminCart'] {
      return useDashboardStore().getAdminCart
    },
    set(value: ICart['adminCart']) {
      useDashboardStore().setAdminCart(value)
    }
  })

  const cartSum = computed((): number => {
    let temp = 0
    if (cart.value.length === 0) return temp
    else {
      cart.value.forEach(
        (item: { product_id: number; price: number; amount: number; image: string; slug: string; title: string }) => {
          temp = temp + item.price * item.amount
        }
      )
    }
    return temp
  })

  const onHandleQuantity = (type: string, id: number) => {
    const index = cart.value.findIndex((item) => item.product_id === id)
    if (index === -1) return
    if (type === 'plus') {
      cart.value[index].amount++
    } else if (cart.value[index].amount === 1) {
      cart.value.splice(index, 1)
    } else {
      cart.value[index].amount--
    }
  }

  const onSubmit = () => {
    cart.value.length = 0
    // cart.value.forEach((item) => {
    //   formData.order.push({
    //     product_id: item.product_id,
    //     price: item.price,
    //     amount: item.amount
    //   })
    // })
    // const res = await $axios.post($endpoint.orderPurchase, formData)
    // const { code, status } = res.data
    // if (status && code === Code.Success) {
    //   $toast().success('Đặt hàng thành công')
    //   cart.value.length = 0
    // }
  }
</script>

<template>
  <div class="dashboard-page-wrapper__body-cart">
    <div class="flex justify-center p-4 border-bottom">Giỏ hàng</div>
    <div class="flex flex-col p-4 gap-4">
      <div v-for="item in cart" :key="item.product_id" class="flex border-bottom pb-2 items-center justify-between">
        <div class="flex flex-col gap-2">
          <div>{{ item.title }}</div>
          <div>
            <div class="flex item-center">
              <v-btn
                :flat="true"
                max-height="30"
                max-width="30"
                class="mr-2"
                icon="mdi-minus"
                @click="onHandleQuantity('minus', item.product_id)" />
              <div class="min-w-10 text-center">
                {{ item.amount }}
              </div>
              <v-btn
                :flat="true"
                max-height="30"
                max-width="30"
                class="mx-2"
                icon="mdi-plus"
                @click="onHandleQuantity('plus', item.product_id)" />
            </div>
          </div>
        </div>
        <div>
          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.amount) }}
        </div>
      </div>
    </div>
    <div v-if="cart.length !== 0" class="flex items-center justify-between p-4">
      <span>Tổng cộng: </span>
      <h2>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartSum) }}</h2>
    </div>
    <div v-if="cart.length !== 0" class="flex justify-center">
      <v-btn variant="outlined" rounded="24" text="Thanh toán" @click="onSubmit" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
