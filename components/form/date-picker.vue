<script setup lang="ts"></script>

<template>
  <div class="custom-only-date-picker">
    <Datepicker v-bind="$attrs" :enable-time-picker="false" format="dd-MM-yyyy" locale="">
      <template #input-icon>
        <div class="custom-only-date-picker__input-slot-icon">
          <img src="@/assets/icons/icon-calendar-date.svg" alt="icon-calendar-date" />
        </div>
      </template>
    </Datepicker>
  </div>
</template>
