<script setup lang="ts">
  import type { ICategoryNode } from '../../define/category'
  import { useCategoryStore } from '../../store'

  const props = defineProps({
    nodes: Array as () => ICategoryNode[]
  })

  const categorySelected = computed({
    get(): { category_id: number; category_name: string } {
      return useCategoryStore().getCategorySelected
    },
    set(val: { category_id: number; category_name: string }) {
      useCategoryStore().setCategorySelected(val)
    }
  })

  const handleCategory = (item: { sub_category_id: number; sub_category_name: string }) => {
    categorySelected.value.category_id = item.sub_category_id
    categorySelected.value.category_name = item.sub_category_name
  }
</script>

<template>
  <div>
    <div v-for="node in props.nodes" :key="node.category_id" class="ml-4">
      <div class="flex item-center">
        {{ node.category_name }}
      </div>
      <div v-if="node.sub_category">
        <div v-for="item in node.sub_category" :key="item.sub_category_id">
          <div class="ml-4 pointer" @click="handleCategory(item)">{{ item.sub_category_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
