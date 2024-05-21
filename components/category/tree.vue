<script setup lang="ts">
  import type { ICategoryNode } from '../../define/category'
  import TreeView from './tree-view.vue'

  const props = defineProps({
    treeData: Array as () => ICategoryNode[]
  })
</script>

<template>
  <div>
    <TreeView :nodes="props.treeData" />
  </div>
</template>

<style scoped lang="scss"></style>
