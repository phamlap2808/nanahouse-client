<script setup lang="ts">
  import { useSystemStore } from '@/store'
  const systemStore = useSystemStore()
</script>

<template>
  <Button>{{ systemStore.getLoadingScreen }}</Button>
</template>
