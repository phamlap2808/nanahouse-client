<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import { Code } from 'define/response-code'
  definePageMeta({
    layout: 'admin'
  })
  const listCategoryChild: ICategory[] = reactive([])
  const isHideCategory = ref(true)
  const loading = ref(false)

  const getListCategoryChild = async () => {
    loading.value = true
    const params = new URLSearchParams({
      raw: '2'
    })
    listCategoryChild.length = 0
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      console.log(data)
      listCategoryChild.push(...data)
      console.log(listCategoryChild)
    }
    loading.value = false
  }

  onMounted( async () => {
    await getListCategoryChild()
  })
</script>
<template>
  <div class="dashboard-page">
    <div class="dashboard-page-wrapper">
      <div class="dashboard-page-wrapper__header">
        <v-icon icon="mdi-menu" size="x-large" class="pointer" @click="isHideCategory = !isHideCategory" />
        <div class="dashboard-page-wrapper__header-search">
          <v-autocomplete
            label="Autocomplete"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="outlined"
            hide-details
          />
        </div>
        <div class="dashboard-page-wrapper__header-filter">
          <div class="w-50 flex justify-end">
            <v-select variant="outlined" hide-details />
          </div>
        </div>
      </div>
      <div class="dashboard-page-wrapper__body">
        <div v-if="isHideCategory" class="dashboard-page-wrapper__body-category">
          <div class="flex justify-center p-4 border-bottom">
            Danh mục
          </div>
          <div class="flex flex-col">
            <div v-for="item in listCategoryChild" :key="item.category_id" class="p-4 border-bottom text-center pointer"> {{item.category_name}} </div>
          </div>
        </div>
        <div class="dashboard-page-wrapper__body-product">
          product
        </div>
      </div>
    </div>
  </div>
</template>
 <style scoped lang="scss">
   .dashboard-page {
     padding: 40px;
     &-wrapper {
       background-color: #fff;
       border-radius: 24px;
       display: flex;
       flex-direction: column;
       height: calc(100vh - 80px);
       &__header {
         display: flex;
         padding: 20px;
         align-items: center;
         border-bottom: 1px solid #e0e0e0;
         justify-content: space-between;
         gap: 16px;
         &-search {
           width: 30%;
         }
         &-filter {
           flex: 1;
           display: flex;
           justify-content: flex-end;
         }
       }
       &__body {
         flex-direction: row;
         display: flex;
         width: 100%;
         height: 100%;
         &-category {
           width: 20%;
           border-right: 1px solid #e0e0e0;
         }
          &-product {
            flex: 1;
          }
       }
     }
   }
 </style>