<script setup lang="ts"></script>

<template>
  <v-container fluid p-0 class="login-page h-100vh">
    <v-row class="h-full d-flex justify-center align-center py-28">
      <v-col cols="12" class="d-flex justify-center align-center flex-column">
        <v-card class="max-w-120 w-full p-4">
          <v-form ref="Form">
            <v-card-title>Nanahouse</v-card-title>
            <v-card-item>
              <v-text-field label="Email" variant="outlined" class="mt-4" :maxlength="225" />
              <v-text-field class="mt-4" :maxlength="225" label="Mật Khẩu" type="password" variant="outlined" />
              <v-text-field label="Họ và tên" variant="outlined" class="mt-4" :maxlength="225" />
            </v-card-item>
            <v-card-text>
              <NuxtLink :to="{ name: 'auth-login' }"> Đăng nhập</NuxtLink>
              <!-- <NuxtLink :to="{ name: 'auth-forgot-password' }"> Quên mật khẩu ? </NuxtLink> -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn type="submit" variant="outlined" class="text-center"> Đăng ký </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
