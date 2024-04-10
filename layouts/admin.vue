<script setup lang="ts">
  const drawer = ref(true)
  const rail = ref(true)
  const onLogout = () => {
    $cookie('remove', 'token')
    $cookie('remove', 'group_id')
    $localStorage('remove', 'permissions')
    return navigateTo({ name: 'auth-login' })
  }
</script>
<template>
  <div class="layout-admin">
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent class="layout-admin__navigation">
        <v-list>
          <v-list-item prepend-icon="mdi-menu" @click="rail = !rail" />
          <v-list-item prepend-icon="mdi-home" @click="navigateTo({ name: 'index' })" />
        </v-list>
        <v-divider />
        <v-list color="transparent">
          <v-list-item
            prepend-icon="mdi-store-settings"
            color="primary"
            variant="plain"
            title="Quản lý cửa hàng"
            to="/admin/dashboard"
            link />
          <v-list-item
            prepend-icon="mdi-shape"
            color="primary"
            variant="plain"
            title="Quản lý danh mục"
            to="/admin/category-management"
            link />
          <v-list-item
            prepend-icon="mdi-store-edit"
            color="primary"
            variant="plain"
            title="Quản lý sản phẩm"
            to="/admin/product-management"
            link />
          <v-list-item
            prepend-icon="mdi-post"
            color="primary"
            variant="plain"
            title="Quản lý bài viết"
            to="/admin/blog-management"
            link />
          <v-list-item
            prepend-icon="mdi-truck"
            color="primary"
            variant="plain"
            title="Quản lý đơn hàng"
            to="/admin/order-management"
            link />
          <v-list-item
            prepend-icon="mdi-text-box"
            color="primary"
            variant="plain"
            title="Quản lý hóa đơn"
            to="/admin/bill-management"
            link />
          <v-list-item
            prepend-icon="mdi-cog"
            color="primary"
            variant="plain"
            title="Cài đặt"
            to="/admin/settings"
            link />
        </v-list>

        <template #append>
          <v-list>
            <v-list-item
              prepend-icon="mdi-logout"
              color="primary"
              variant="plain"
              title="Đăng xuất"
              @click="onLogout" />
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-main class="min-h-100vh">
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>

<style scoped lang="scss">
  .layout-admin {
    background-color: #f5f5f5;

    &__navigation {
      border-radius: 0 24px 24px 0;
    }
  }
</style>
