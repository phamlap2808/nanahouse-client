<script setup lang="ts">
  const onLogout = () => {
    $cookie('remove', 'token')
    $cookie('remove', 'group_id')
    $localStorage('remove', 'permissions')
    return navigateTo({ name: 'auth-login' })
  }
</script>
<template>
  <div>
    <v-layout>
      <v-navigation-drawer permanent>
        <v-list color="transparent">
          <v-list-item color="primary" variant="plain" title="Quản lý danh mục" to="/admin/category-management" link />
          <v-list-item color="primary" variant="plain" title="Quản lý sản phẩm" to="/admin/product-management" link />
          <v-list-item color="primary" variant="plain" title="Quản lý bài viết" to="/admin/blog-management" link />
          <v-list-item color="primary" variant="plain" title="Quản lý đơn hàng" to="/admin/order-management" link />
          <v-list-item color="primary" variant="plain" title="Quản lý hóa đơn" to="/admin/bill-management" link />
          <v-list-item color="primary" variant="plain" title="Cài đặt" to="/admin/settings" link />
        </v-list>

        <template #append>
          <div class="pa-2">
            <v-btn block @click="onLogout"> Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main class="min-h-100vh">
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>
