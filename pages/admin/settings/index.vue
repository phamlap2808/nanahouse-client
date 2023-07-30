<script setup lang="ts">
  import GroupManagement from 'components/admin/settings/group-management.vue'
  import UserManagement from 'components/admin/settings/user-management.vue'
  definePageMeta({
    layout: 'admin'
  })

  const tab = ref('users')
</script>

<template>
  <div class="settings">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab value="users">Quản lý tài khoản</v-tab>
      <v-tab value="groups">Quản lý nhóm</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="users"> <UserManagement /> </v-window-item>

        <v-window-item value="groups"> <GroupManagement /> </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
