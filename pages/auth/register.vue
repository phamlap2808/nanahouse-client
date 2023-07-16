<script setup lang="ts"></script>

<template>
  <v-container fluid p-0 class="login-page">
    <v-row>
      <v-col cols="12">
        <v-form ref="Form" class="max-w-100">
          <v-text-field label="Email" variant="outlined" />
          <v-text-field label="Mật Khẩu" variant="outlined" />

          <v-btn variant="outlined"> Đăng ký </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
