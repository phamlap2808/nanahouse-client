<template>
  <v-app id="app" class="bg-white">
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </v-app>
</template>
