<script setup lang="ts">
  import ConfirmModal from './ignore/confirm-modal.vue'
  import { regexEmail } from 'constant/regex'
  import { Code } from 'define/response-code'

  definePageMeta({
    layout: 'auth'
  })

  const Form = ref()
  const formData = reactive({
    email: '',
    password: '',
    name: '',
    birthday: '',
    phone: ''
  })
  const openModal = ref(false)

  const rules = {
    email: [
      (v: any) => !!v || 'Email không được bỏ trống',
      (v: any) => regexEmail.test(v) || 'Email không đúng định dạng'
    ],
    password: [(v: any) => !!v || 'Mật khẩu không được bỏ trống'],
    name: [(v: any) => !!v || 'Họ và tên không được bỏ trống'],
    birthday: [(v: any) => !!v || 'Sinh nhật không được bỏ trống'],
    phone: [(v: any) => !!v || 'Số điện thoại không được bỏ trống']
  }

  const onCloseModal = () => {
    openModal.value = false
    navigateTo({ name: 'auth-login' })
  }

  const onSubmit = async () => {
    const { valid } = await Form.value.validate()
    if (!valid) return
    const data = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      birthday: $helper.datePickerFormat(formData.birthday),
      phone: formData.phone
    }
    const res = await $axios.post($endpoint.register, data)
    const { code, status } = res.data
    if (status && code === Code.Success) {
      openModal.value = true
    }
  }
</script>

<template>
  <v-container fluid p-0 class="login-page h-100vh">
    <v-row class="h-full d-flex justify-center align-center py-28">
      <v-col cols="12" class="d-flex justify-center align-center flex-column">
        <div class="max-w-120 w-full p-4 border">
          <v-form ref="Form" @submit.prevent="onSubmit">
            <v-card-title>Nanahouse</v-card-title>
            <v-text-field
              v-model="formData.email"
              label="Email"
              :rules="rules.email"
              variant="outlined"
              class="mt-2"
              :maxlength="225" />
            <v-text-field
              v-model="formData.password"
              class="mt-2"
              :rules="rules.password"
              :maxlength="225"
              label="Mật Khẩu"
              type="password"
              variant="outlined" />
            <v-text-field
              v-model="formData.name"
              :rules="rules.name"
              label="Họ và tên"
              variant="outlined"
              class="mt-2"
              :maxlength="225" />
            <Datepicker
              v-model="formData.birthday"
              :enable-time-picker="false"
              format="yyyy-MM-dd"
              placeholder="Sinh nhật"
              locale="vi"
              class="mt-2" />
            <v-text-field v-model="formData.birthday" :rules="rules.birthday" class="hide-input" />
            <v-text-field
              v-model="formData.phone"
              :rules="rules.phone"
              label="Số điện thoại"
              variant="outlined"
              class="mt-2"
              :maxlength="10" />
            <v-card-text>
              <NuxtLink :to="{ name: 'auth-login' }"> Đăng nhập</NuxtLink>
              <!-- <NuxtLink :to="{ name: 'auth-forgot-password' }"> Quên mật khẩu ? </NuxtLink> -->
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn type="submit" variant="outlined" class="text-center"> Đăng ký </v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-col>
    </v-row>

    <ConfirmModal :is-open="openModal" @on-close="onCloseModal" />
  </v-container>
</template>
