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
      required: true,
      default: ''
    },
    width: {
      type: String,
      required: false,
      default: '376px'
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
    isOnClickOutsideFunction: {
      type: Boolean,
      required: false,
      default: false
    },
    clickOutsideFunction: {
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
    }
  })

  const {
    isOpen,
    toggleOpen,
    title,
    width,
    buttonText,
    callbackFunction,
    isOnClickOutsideFunction,
    clickOutsideFunction,
    loading
  } = toRefs(props)

  const onClickOutside = () => {
    toggleOpen.value(false)
    if (isOnClickOutsideFunction) {
      clickOutsideFunction.value()
    }
  }
</script>

<template>
  <v-row justify="center">
    <client-only>
      <v-dialog
        v-model="isOpen"
        persistent
        scrollable
        :max-width="width"
        custom-attribute="confirm-dialog"
        @click:outside="onClickOutside">
        <v-card>
          <v-card-title>
            <div class="title">
              <div>{{ title }}</div>
              <slot name="title" />
            </div>
          </v-card-title>
          <v-card-text>
            <slot name="main" />
          </v-card-text>
          <v-card-actions>
            <div class="submit-button d-flex justify-center">
              <v-btn type="submit" :disabled="loading" @click="callbackFunction">
                <span class="fw-400 fs-16 text-white">
                  {{ buttonText }}
                </span>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </client-only>
  </v-row>
</template>
