<script setup lang="ts">
  import { Code } from 'define/response-code'

  const loading = ref(true)
  const cartStorage = ref<{ product_id: number; price: number; amount: number; image: string; title: string }[]>([])

  const formData: {
    name: string
    phone: string
    address: string
    type_of_customer: number
    email: string
    order: { product_id: number; price: number; amount: number }[]
  } = reactive({
    name: '',
    phone: '',
    address: '',
    type_of_customer: 1,
    email: '',
    order: []
  })

  const Form = ref()

  const rules = {
    name: [(v: string) => !!v || 'Họ và tên không được bỏ trống'],
    phone: [
      (v: string) => !!v || 'Số điện thoại không được bỏ trống',
      (v: string) =>
        /^(02[0-9]|03[2-9]|04[0-9]|05[6|8|9]|06[0-9]|07[0|6|7|8|9]|08[1|2|3|4|5]|09[0|1|2|3|4|6|7|8|9])+([0-9]{6,9})$/.test(
          v
        ) || 'Số điện thoại không đúng định dạnh'
    ],
    email: [
      (v: string) => /.+@.+\..+/.test(v) || 'Email không đúng định dạng'
    ],
    address: [(v: string) => !!v || 'Địa chỉ không được bỏ trống']
  }

  const handleTotalPriceOnCart = computed(() => {
    let total = 0
    cartStorage.value.forEach((item) => {
      total += item.price * item.amount
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

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    cartStorage.value.forEach((item) => {
      formData.order.push({
        product_id: item.product_id,
        price: item.price,
        amount: item.amount
      })
    })
    const res = await $axios.post($endpoint.orderPurchase, formData)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Đặt hàng thành công')
      $localStorage('remove', 'cart_storage')
      navigateTo({ name: 'home' })
    }
  }
</script>

<template>
  <div class="checkout-shipping">
    <div class="checkout-shipping__container container">
      <v-form ref="Form" @submit.prevent="onSubmit">
        <div class="checkout-shipping__header">
          <div class="checkout-shipping__header__title">Tiến hành đặt hàng</div>
        </div>
        <div class="checkout-shipping__body">
          <div class="checkout-shipping__body__left">
            <div class="checkout-shipping__body__left__title">Thông tin liên hệ</div>
            <div class="checkout-shipping__body__left__form">
              <div class="checkout-shipping__body__left__form__item">
                <div class="checkout-shipping__body__left__form__item__label">Họ và tên</div>
                <div class="checkout-shipping__body__left__form__item__input">
                  <v-text-field v-model="formData.name" :rules="rules.name" :flat="true" variant="outlined" />
                </div>
              </div>
              <div class="checkout-shipping__body__left__form__item">
                <div class="checkout-shipping__body__left__form__item__label">Số điện thoại</div>
                <div class="checkout-shipping__body__left__form__item__input">
                  <v-text-field v-model="formData.phone" :rules="rules.phone" :flat="true" variant="outlined" />
                </div>
              </div>
              <div class="checkout-shipping__body__left__form__item">
                <div class="checkout-shipping__body__left__form__item__label">Email</div>
                <div class="checkout-shipping__body__left__form__item__input">
                  <v-text-field v-model="formData.email" :rules="rules.email" :flat="true" variant="outlined" />
                </div>
              </div>
              <div class="checkout-shipping__body__left__form__item">
                <div class="checkout-shipping__body__left__form__item__label">Địa chỉ</div>
                <div class="checkout-shipping__body__left__form__item__input">
                  <v-text-field v-model="formData.address" :rules="rules.address" :flat="true" variant="outlined" />
                </div>
              </div>
            </div>
          </div>
          <div class="checkout-shipping__body__right">
            <div class="checkout-shipping__body__right__title">Đơn hàng</div>
            <div class="checkout-shipping__body__right__list">
              <div
                v-for="item in cartStorage"
                :key="item.product_id"
                class="checkout-shipping__body__right__list__item">
                <div class="checkout-shipping__body__right__list__item__image">
                  <v-img :src="item.image" alt="thumbnail" />
                </div>
                <div class="checkout-shipping__body__right__list__item__info">
                  <div class="checkout-shipping__body__right__list__item__info__title">{{ item.title }}</div>
                  <div class="checkout-shipping__body__right__list__item__info__price">
                    {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price) }}
                  </div>
                  <div class="checkout-shipping__body__right__list__item__info__quantity">
                    <div class="checkout-shipping__body__right__list__item__info__quantity__title">Số lượng:</div>
                    <div class="checkout-shipping__body__right__list__item__info__quantity__value">
                      {{ item.amount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="checkout-shipping__body__right__total">
              <div class="checkout-shipping__body__right__total__title">Tổng cộng</div>
              <div class="checkout-shipping__body__right__total__value">
                {{
                  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(handleTotalPriceOnCart)
                }}
              </div>
            </div>
            <div class="checkout-shipping__body__right__button">
              <v-btn type="submit" color="primary" class="text-center">Đặt hàng</v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  // css checkout-shipping responsive
  .checkout-shipping {
    &__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    &__header__title {
      font-size: 24px;
      font-weight: 500;
    }

    &__body {
      display: flex;
      gap: 20px;
      padding: 20px 0;
    }

    &__body__left {
      flex: 1;
    }

    &__body__left__title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    &__body__left__form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__body__left__form__item {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__body__left__form__item__label {
      font-size: 14px;
      font-weight: 500;
      color: #757575;
    }

    &__body__left__form__item__input {
      display: flex;
      align-items: center;
    }

    &__body__right {
      flex: 1;
    }

    &__body__right__title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    &__body__right__list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__body__right__list__item {
      display: flex;
      gap: 20px;
    }

    &__body__right__list__item__image {
      width: 100px;
      height: 100px;
    }

    &__body__right__list__item__info {
      flex: 1;
    }

    &__body__right__list__item__info__title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    &__body__right__list__item__info__price {
      font-size: 14px;
      font-weight: 500;
      color: #757575;
      margin-bottom: 10px;
    }

    &__body__right__list__item__info__quantity {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__body__right__list__item__info__quantity__title {
      font-size: 14px;
      font-weight: 500;
      color: #757575;
    }

    &__body__right__list__item__info__quantity__value {
      font-size: 14px;
      font-weight: 500;
      color: #757575;
    }

    &__body__right__total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    &__body__right__total__title {
      font-size: 16px;
      font-weight: 500;
    }

    &__body__right__total__value {
      font-size: 16px;
      font-weight: 500;
    }

    &__body__right__button {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
