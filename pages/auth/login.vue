<script setup lang="ts">
  import { ENCRYPT_SIGNATURE } from 'constant/common'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'auth'
  })

  const Form = ref()
  const loading = ref(false)
  const formData = reactive({
    email: '',
    password: ''
  })

  const rules = {
    email: [(v: any) => !!v || 'Email không được bỏ trống'],
    password: [(v: any) => !!v || 'Mật khẩu không được bỏ trống']
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const res = await $axios.post($endpoint.login, formData)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      $cookie('token', $crypto.encrypt(data.access_token, ENCRYPT_SIGNATURE))
    }
  }
</script>

<template>
  <v-container fluid p-0 class="login-page h-100vh">
    <v-row class="h-full d-flex justify-center align-center py-28">
      <v-col cols="12" class="d-flex justify-center align-center flex-column">
        <v-card class="max-w-120 w-full p-4">
          <v-form ref="Form" @submit.prevent="onSubmit">
            <v-card-title>Nanahouse</v-card-title>
            <v-card-item>
              <v-text-field
                v-model="formData.email"
                :rules="rules.email"
                label="Email"
                variant="outlined"
                class="mt-2"
                :maxlength="225" />
              <v-text-field
                v-model="formData.password"
                :rules="rules.password"
                class="mt-2"
                :maxlength="225"
                label="Mật Khẩu"
                type="password"
                variant="outlined" />
            </v-card-item>
            <v-card-text>
              <NuxtLink :to="{ name: 'auth-register' }"> Đăng ký </NuxtLink>
              <!-- <NuxtLink :to="{ name: 'auth-forgot-password' }"> Quên mật khẩu ? </NuxtLink> -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn type="submit" variant="outlined" class="text-center"> Đăng nhập </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
