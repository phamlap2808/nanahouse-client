<script setup lang="ts"></script>
<template>
  <div class="layout-default">
    <layouts-header-default />
    <v-layout class="min-h-150">
      <!-- <v-navigation-drawer v-model="drawer" permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer> -->
      <v-main class="h-full">
        <div class="layout-default__container container">
          <slot />
        </div>
      </v-main>
    </v-layout>
    <layouts-footer-default />
  </div>
</template>
