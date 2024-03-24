<script setup lang="ts">
  import type { IListPurchase } from 'define/order'
  import { Code } from 'define/response-code'

  const emits = defineEmits(['refecth'])
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    toggleOpen: {
      type: Function,
      required: true
    },
    order: {
      type: Object as () => IListPurchase,
      required: true
    }
  })
  const loading = ref(false)

  const formatDate = (date: string) => {
    return $date(date).format('DD/MM/YYYY')
  }

  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

  const onSubmit = async () => {
    const formData = new FormData()
    formData.append('cart_id', props.order.cart_id.toString())
    const res = await $axios.post($endpoint.createBill, formData)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      $toast().success('Xuất hóa đơn thành công')
      emits('refecth')
    }
  }
</script>

<template>
  <dialog-base
    :is-open="isOpen"
    :toggle-open="toggleOpen"
    width="640px"
    :title="`Xem chi tiết đơn hàng #${order.cart_id}`"
    button-text="Xuất hóa đơn"
    :loading="loading"
    :callback-function="onSubmit">
    <template #main>
      <div class="flex flex-col gap-3">
        <div class="flex gap-2">
          <div>Tên khách hàng:</div>
          <div>{{ order.user_info.name }}</div>
        </div>
        <div class="flex gap-2">
          <div>Số điện thoại:</div>
          <div>{{ order.user_info.phone_number }}</div>
        </div>
        <div class="flex gap-2">
          <div>Email:</div>
          <div>{{ order.user_info.email }}</div>
        </div>
        <div class="flex gap-2">
          <div>Địa chỉ:</div>
          <div>{{ order.address }}</div>
        </div>
        <div class="flex gap-2">
          <div>Loại khách hàng:</div>
          <div>{{ order.type_of_customer === 1 ? 'Thành viên' : 'Khách vãng lai' }}</div>
        </div>
        <div class="flex gap-2">
          <div>Ngày đặt hàng:</div>
          <div>{{ formatDate(order.ordered_at) }}</div>
        </div>
        <div class="flex gap-2">
          <div>Trạng thái đơn hàng:</div>
          <div>{{ order.cart_status === 0 ? 'Đơn hàng mới' : 'đã xuất hóa đơn' }}</div>
        </div>
      </div>
      <div>
        <table class="w-full mt-6">
          <tr>
            <th class="text-left">Mã Sản phẩm</th>
            <th class="text-left">Tên sản phẩm</th>
            <th class="text-center">Số lượng</th>
            <th class="text-right">Giá</th>
          </tr>
          <tr v-for="item in order.orders" :key="item.product_id">
            <td class="text-left">{{ item.product_id }}</td>
            <td class="text-left break-words">{{ item.product_name }}</td>
            <td class="text-center">{{ item.amount }}</td>
            <td class="text-right break-words">{{ formatter.format(item.price) }}</td>
          </tr>
        </table>
      </div>
      <div class="flex justify-end mt-4">
        <div>Thành tiền: {{ formatter.format(order.total_amount) }}</div>
      </div>
    </template>
  </dialog-base>
</template>
