<script lang="ts" setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    toggleOpen: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    width: {
      type: String,
      required: false,
      default: '400px'
    },
    height: {
      type: String,
      required: false
    },
    buttonText: {
      type: String,
      required: false,
      default: ''
    },
    callbackFunction: {
      type: Function,
      required: false,
      default: () => {
        return true
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    formIdToSubmit: {
      type: String,
      required: false,
      default: ''
    },
    disabledBtn: {
      type: Boolean,
      required: false,
      default: false
    }
  })

  const {
    isOpen,
    toggleOpen,
    title,
    width,
    buttonText,
    callbackFunction,
    loading,
    formIdToSubmit,
    disabledBtn,
    height
  } = toRefs(props)
</script>
<template>
  <v-row justify="center">
    <client-only>
      <v-dialog
        v-model="isOpen"
        persistent
        scrollable
        :max-width="width"
        :height="height"
        custom-attribute="base-dialog"
        @click:outside="toggleOpen(false)">
        <v-card class="p-4">
          <v-card-title>
            <div class="flex justify-between item-center">
              <div class="title">
                <div v-if="title">
                  {{ title }}
                </div>
                <slot name="title" />
              </div>
              <v-icon size="small" icon="mdi-close-circle" @click="toggleOpen(false)" />
            </div>
          </v-card-title>
          <v-card-text>
            <slot name="main" />
          </v-card-text>
          <v-card-actions v-if="buttonText" class="justify-end">
            <div class="submit-button d-flex justify-center">
              <v-btn type="submit" :form="formIdToSubmit" :disabled="loading || disabledBtn" @click="callbackFunction">
                <span class="fs-16 button-text">
                  {{ buttonText }}
                </span>
              </v-btn>
            </div>
          </v-card-actions>
          <slot name="footer" />
        </v-card>
      </v-dialog>
    </client-only>
  </v-row>
</template>
