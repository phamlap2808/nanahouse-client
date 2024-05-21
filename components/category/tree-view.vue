<script setup lang="ts">
  import type { ICategoryNode } from '../../define/category'
  import { useCategoryStore } from '../../store'

  const props = defineProps({
    nodes: Array as () => ICategoryNode[]
  })

  const categorySelected = computed({
    get(): { _id: number; name: string } {
      return useCategoryStore().getCategorySelected
    },
    set(val: { _id: number; name: string }) {
      useCategoryStore().setCategorySelected(val)
    }
  })

  const handleCategory = (item: { _id: number; name: string }) => {
    categorySelected.value._id = item._id
    categorySelected.value.name = item.name
  }
</script>

<template>
  <div>
    <div v-for="node in props.nodes" :key="node._id" class="ml-4">
      <div class="flex item-center" @click="handleCategory(node)">
        {{ node.name }}
      </div>
      <div v-if="node.children">
        <div v-for="item in node.children" :key="item._id">
          <div class="ml-4 pointer" @click="handleCategory(item)">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
