<script setup lang="ts">
  definePageMeta({
    layout: 'auth'
  })

  const checkVerifyKey = async () => {
    const key = useRoute().query?.key as string

    if (!key) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    const res = await $axios.post($endpoint.verificationEmail, { key })

    const { status } = res.data
    if (!status) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    $toast().success('Xác thực thành công')
    navigateTo({ name: 'auth-login' })
  }

  checkVerifyKey()
</script>
