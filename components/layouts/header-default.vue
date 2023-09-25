<script setup lang="ts">
  const cartStorage = ref<{ product_id: number; price: number; amount: number; image: string; title: string }[]>([])
  const countAllProduct = computed(() => {
    let total = 0
    cartStorage.value.forEach((item) => {
      total += item.amount
    })
    return total
  })

  onMounted(() => {
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
  })
</script>
<template>
  <div class="header-default w-full border-bottom">
    <div class="header-default__banner"></div>
    <div class="header-default__main max-w-267">
      <div class="flex item-center justify-between max-w-267 w-full">
        <img src="@/assets/icons/logo-branch.svg" alt="nanahouse-logo" class="size-30" />
        <div class="max-w-88 w-full">
          <v-autocomplete
            append-inner-icon="mdi-magnify"
            auto-select-first
            class="flex-full-width"
            density="comfortable"
            item-props
            placeholder="Tìm kiếm"
            rounded
            hide-details
            :flat="true"
            variant="outlined" />
        </div>
        <div class="header-default__main-icons flex gap-2 w-30">
          <div>
            <v-icon icon="mdi-account-outline" size="40" />
          </div>
          <div>
            <v-badge color="error" :content="countAllProduct">
              <v-icon icon="mdi-cart-heart" size="40" />
            </v-badge>
          </div>
          <div>
            <v-icon icon="mdi-heart-outline" size="40" />
          </div>
        </div>
      </div>
      <div></div>
      <div class="header-default__main-mobile">
        <v-icon icon="mdi-menu" size="40" />
        <div class="header-default__main-mobile-icons gap-4 w-30">
          <v-icon icon="mdi-account-outline" size="40" />
          <v-icon icon="mdi-cart-outline" size="40" />
          <v-icon icon="mdi-heart-outline" size="40" />
        </div>
      </div>
    </div>
    <div class="header-default__navigation">
      <div class="flex item-center justify-between container mx-auto">
        <div>Trang chủ</div>
        <div>Sản phẩm</div>
        <div>Bài viết</div>
        <div>Video</div>
        <div>Giới thiệu</div>
        <div>Liên hệ</div>
      </div>
    </div>
  </div>
</template>
