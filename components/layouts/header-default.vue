<script setup lang="ts"></script>
<template>
  <v-layout>
    <div class="header-default w-full">
      <div class="header-default__banner"></div>
      <div class="header-default__main max-w-267">
        <div class="flex item-center justify-between max-w-267 w-full">
          <img src="@/assets/icons/logo-branch.svg" alt="nanahouse-logo" class="size-30" />
          <div class="max-w-88 w-full">
            <v-autocomplete
              append-inner-icon="mdi-magnify"
              auto-select-first
              class="flex-full-width"
              density="comfortable"
              item-props
              placeholder="Tìm kiếm"
              rounded
              hide-details
              theme="light"
              variant="solo" />
          </div>
          <div class="header-default__main-icons gap-4 w-25">
            <v-icon icon="mdi-account-outline" size="x-large" />
            <v-icon icon="mdi-cart-outline" size="x-large" />
            <v-icon icon="mdi-heart-outline" size="x-large" />
          </div>
        </div>
        <div class="header-default__main-mobile">
          <v-icon icon="mdi-menu" size="x-large" />
          <div class="header-default__main-mobile-icons gap-4 w-25">
            <v-icon icon="mdi-account-outline" size="x-large" />
            <v-icon icon="mdi-cart-outline" size="x-large" />
            <v-icon icon="mdi-heart-outline" size="x-large" />
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>
