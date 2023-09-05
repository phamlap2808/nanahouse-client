<template>
  <div>
    <v-layout>
      <v-navigation-drawer permanent>
        <v-list color="transparent">
          <v-list-item color="primary" variant="plain" title="Quản lý danh mục" to="/admin/category-management" link />
          <v-list-item color="primary" variant="plain" title="Quản lý sản phẩm" to="/admin/product-management" link />
          <v-list-item color="primary" variant="plain" title="Quản lý bài viết" to="/admin/blog-management" link />
          <v-list-item color="primary" variant="plain" title="Cài đặt" to="/admin/settings" link />
        </v-list>

        <template #append>
          <div class="pa-2">
            <v-btn block> Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main class="min-h-100vh">
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>
<script setup></script>
