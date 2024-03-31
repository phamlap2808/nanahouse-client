<script setup lang="ts">
  import type { IListPurchase } from 'define/order'
  import { Code } from 'define/response-code'
  import html2pdf from 'html2pdf.js'
  import printJS from 'print-js'

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
  const hide = ref(false)

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

  const printDocument = () => {
    hide.value = true
    printJS({
      printable: 'downloadable-element',
      type: 'html',
      style: `
        .flex { display: flex }
        .flex-col {
          flex-direction: column;
        }
        .gap-6 {
          gap: 24px;
        }
        .justify-between {
          justify-content: space-between;
        }
        .justify-end {
          justify-content: flex-end;
        }
        .item-center {
          align-items: center;
        }
        .w-full {
          width: 100%;
        }
        .size-40 {
          width: 160px;
          height: 160px;
        }
        .fap-2 {
          gap: 8px;
        }
        .mt-6 {
          margin-top: 24px;
        }
        .text-left {
          text-align: left;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
        .break-words {
          word-break: break-word;
          white-space: break-spaces;
        }
        .mt-4 {
          margin-top: 16px;
        }
        .fs-24 {
          font-size: 24px;
        }
        .fw-700 {
          font-weight: 700;
        }
        .fs-20 {
          font-size: 20px;
        }
      `
    })
  }
  const downloadDocument = () => {
    hide.value = false
    const element = document.getElementById('downloadable-element')
    const opt = {
      margin: 1,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save()
  }
</script>

<template>
  <dialog-base
    :is-open="isOpen"
    :toggle-open="toggleOpen"
    width="800px"
    :title="`Xem chi tiết đơn hàng #${order.cart_id}`"
    :loading="loading">
    <template #main>
      <div id="downloadable-element" class="flex flex-col gap-6">
        <div class="flex justify-between item-center">
          <img src="@/assets/icons/logo-branch.svg" alt="nanahouse-logo" class="size-40" />
          <div>
            <div>Mã hóa đơn: #{{ order.cart_id }}</div>
            <div>{{ formatDate(order.ordered_at) }}</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex justify-between">
            <div>Nanahouse decor & gift</div>
            <div class="flex gap-2">
              <div>Tên khách hàng:</div>
              <div>{{ order.user_info.name }}</div>
            </div>
          </div>
          <div class="flex justify-between">
            <div>199 Tết Mậu Thân, phường 4, TP Mỹ Tho, tỉnh Tiền Giang</div>
            <div class="flex gap-2">
              <div>Địa chỉ:</div>
              <div>{{ order.address }}</div>
            </div>
          </div>
          <div class="flex justify-between">
            <div>0383555093</div>
            <div class="flex gap-2">
              <div>Số điện thoại:</div>
              <div>{{ order.user_info.phone_number }}</div>
            </div>
          </div>
          <div class="flex justify-between">
            <div>nanohuynh97@gmail.com</div>
            <div class="flex gap-2">
              <div>Email:</div>
              <div>{{ order.user_info.email }}</div>
            </div>
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
      </div>
      <!--      <div id="print-element" class="flex flex-col gap-6">-->
      <!--        <div class="flex justify-between item-center">-->
      <!--          <img src="@/assets/icons/logo-branch.svg" alt="nanahouse-logo" class="size-40" />-->
      <!--          <div>-->
      <!--            <div class="fs-24 fw-700">Mã hóa đơn: #{{ order.cart_id }}</div>-->
      <!--            <div class="fs-24 fw-700">{{ formatDate(order.ordered_at) }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="flex flex-col fs-20 fw-700">-->
      <!--          <div>Nanahouse decor & gift</div>-->
      <!--          <div>199 Tết Mậu Thân, phường 4, TP Mỹ Tho, tỉnh Tiền Giang</div>-->
      <!--          <div>0383555093</div>-->
      <!--          <div>nanohuynh97@gmail.com</div>-->
      <!--        </div>-->
      <!--        <div class="flex flex-col">-->
      <!--          <div class="flex gap-2 fs-24 fw-700">-->
      <!--            {{ order.user_info.name }}-->
      <!--          </div>-->
      <!--          <div class="fs-20 fw-700">-->
      <!--            <div>{{ order.address }}</div>-->
      <!--          </div>-->
      <!--          <div class="fs-20 fw-700">-->
      <!--            <div>{{ order.user_info.phone_number }}</div>-->
      <!--          </div>-->
      <!--          <div class="flex fs-20 fw-700">-->
      <!--            <div>{{ order.user_info.email }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div>-->
      <!--          <table class="w-full mt-6">-->
      <!--            <tr class="fs-24 fw-700">-->
      <!--              <th class="text-left">Mã Sản phẩm</th>-->
      <!--              <th class="text-left">Tên sản phẩm</th>-->
      <!--              <th class="text-center">Số lượng</th>-->
      <!--              <th class="text-right">Giá</th>-->
      <!--            </tr>-->
      <!--            <tr v-for="item in order.orders" :key="item.product_id" class="fs-20 fw-700">-->
      <!--              <td class="text-left">{{ item.product_id }}</td>-->
      <!--              <td class="text-left break-words">{{ item.product_name }}</td>-->
      <!--              <td class="text-center">{{ item.amount }}</td>-->
      <!--              <td class="text-right break-words">{{ formatter.format(item.price) }}</td>-->
      <!--            </tr>-->
      <!--          </table>-->
      <!--        </div>-->
      <!--        <div class="flex justify-end mt-4">-->
      <!--          <div class="fs-24 fw-700">Thành tiền: {{ formatter.format(order.total_amount) }}</div>-->
      <!--        </div>-->
      <!--      </div>-->
    </template>
    <template #footer>
      <div class="flex justify-center gap-2 mb-5">
        <v-btn @click="downloadDocument">Tải hóa đơn</v-btn>
        <v-btn @click="printDocument">In hóa đơn</v-btn>
        <v-btn @click="onSubmit">Xuất hóa đơn</v-btn>
      </div>
    </template>
  </dialog-base>
</template>
