<script setup lang="ts">
  const cartStorage = ref<{ product_id: number; price: number; amount: number; image: string; title: string }[]>([])
  const countAllProduct = computed(() => {
    let total = 0
    cartStorage.value.forEach((item) => {
      total += item.amount
    })
    return total
  })

  const redirect = (name: string) => {
    return navigateTo({ name })
  }

  const redirectUser = () => {
    if (!isLogin) {
      return navigateTo({ name: 'auth-login' })
    }
    if (isAdmin) {
      return navigateTo({ name: 'admin-dashboard' })
    }
  }

  const { isLogin, isAdmin } = $helper

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
            :item-props="true"
            placeholder="Tìm kiếm"
            rounded
            hide-details
            :flat="true"
            variant="outlined" />
        </div>
        <div class="header-default__main-icons flex gap-2 w-30">
          <div>
            <v-icon v-if="!isLogin || isAdmin" icon="mdi-account-outline" size="40" @click="redirectUser" />
          </div>
          <div>
            <v-icon v-if="countAllProduct === 0" icon="mdi-cart-heart" size="40" @click="redirect('gio-hang')" />
            <v-badge v-else color="error" :content="countAllProduct">
              <v-icon icon="mdi-cart-heart" size="40" @click="redirect('gio-hang')" />
            </v-badge>
          </div>
<!--          <div>-->
<!--            <v-icon icon="mdi-heart-outline" size="40" />-->
<!--          </div>-->
        </div>
      </div>
      <div></div>
      <div class="header-default__main-mobile">
        <v-icon icon="mdi-menu" size="40" />
        <div class="header-default__main-mobile-icons gap-4 w-30">
          <v-icon v-if="!isLogin || isAdmin" icon="mdi-account-outline" size="40" @click="redirectUser" />
          <v-icon icon="mdi-cart-outline" size="40" />
<!--          <v-icon icon="mdi-heart-outline" size="40" />-->
        </div>
      </div>
    </div>
    <div class="header-default__navigation">
      <div class="flex item-center justify-between container mx-auto">
        <div class="pointer" @click="redirect('index')">Trang chủ</div>
        <div class="pointer" @click="redirect('danh-muc')">Sản phẩm</div>
        <div class="pointer" @click="redirect('bai-viet')">Bài viết</div>
        <div class="pointer" @click="redirect('video')">Video</div>
        <div class="pointer" @click="redirect('gioi-thieu')">Giới thiệu</div>
        <div class="pointer" @click="redirect('lien-he')">Liên hệ</div>
      </div>
    </div>
  </div>
</template>
