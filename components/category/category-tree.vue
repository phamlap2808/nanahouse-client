<script setup lang="ts">
  import type { ICategoryNode } from '../../define/category'
  import CategoryTreeView from './category-tree-view.vue'

  const props = defineProps({
    treeData: Array as () => ICategoryNode[]
  })
</script>

<template>
  <div>
    <CategoryTreeView :nodes="props.treeData" />
  </div>
</template>

<style scoped lang="scss"></style>
