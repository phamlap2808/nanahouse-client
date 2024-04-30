<script setup lang="ts">
  import type { ICategory } from 'define/category'
  import type { IProduct } from 'define/product'
  import Cart from './ignore/cart.vue'
  import Product from './ignore/product.vue'
  import { Code } from 'define/response-code'
  definePageMeta({
    layout: 'admin'
  })
  const listCategoryChild: ICategory[] = reactive([])
  const isHideCategory = ref(true)
  const loading = ref(true)
  const listProduct = ref<IProduct[]>([])
  const listSearch = ref<IProduct[]>([])
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(9)
  const totalRecord = ref(0)
  const category = ref(0)
  const search = ref('')
  const searchInput = ref('')

  const getListCategoryChild = async () => {
    const params = new URLSearchParams({
      raw: '2'
    })
    listCategoryChild.length = 0
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategoryChild.push(...data)
    }
  }

  const getListProduct = async () => {
    loading.value = true
    const params = new URLSearchParams({
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    if (category.value) {
      params.append('category_id', category.value.toString())
    }
    const res = await $axios.get($endpoint.productList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listProduct.value = data.products_list
      currentPage.value = data.current_page
      totalPage.value = data.total_page
      totalPageRecord.value = data.total_page_record
      totalRecord.value = data.total_record
    }
    loading.value = false
  }

  const getListSearch = async () => {
    if (!searchInput.value) {
      listSearch.value = []
      return
    }

    const params = new URLSearchParams({
      title: searchInput.value
    })

    const res = await $axios.get($endpoint.productList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listSearch.value = data.products_list
    }
  }

  // onMounted(async () => {
  //   await getListCategoryChild()
  //   await getListProduct()
  // })
  //
  // watch(category, async () => {
  //   await getListProduct()
  // })
  //
  // watch(currentPage, async () => {
  //   await getListProduct()
  // })
  //
  // watch(() => search.value, async () => {
  //   await getListSearch()
  //   // $lodash.debounce(async () => {
  //   //   await getListSearch()
  //   // }, 500)
  // })
</script>
<template>
  <div class="dashboard-page">
    <div class="dashboard-page-wrapper">
      <div class="dashboard-page-wrapper__header">
        <v-icon icon="mdi-menu" size="x-large" class="pointer" @click="isHideCategory = !isHideCategory" />
        <div class="dashboard-page-wrapper__header-search">
          <v-autocomplete
            v-model:search-input="searchInput"
            :items="listSearch"
            label="Autocomplete"
            variant="outlined"
            hide-details
            @update:search-input="getListSearch"
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
          <div class="flex justify-center p-4 border-bottom">Danh mục</div>
          <div class="flex flex-col">
            <div class="p-4 border-bottom text-center pointer" @click="category = 0">Tất cả</div>
            <div
              v-for="item in listCategoryChild"
              :key="item.category_id"
              class="p-4 border-bottom text-center pointer"
              @click="category = item.category_id"
            >
              {{ item.category_name }}
            </div>
          </div>
        </div>
        <div v-if="!loading" class="dashboard-page-wrapper__body-product">
          <div class="dashboard-page-wrapper__body-product--list">
            <Product v-for="product in listProduct" :key="product.id" :product="product" />
          </div>
          <div class="dashboard-page-wrapper__body-product--pagination">
            <v-pagination
              v-model="currentPage"
              :length="totalPage"
              :total-visible="7"
            />
          </div>
        </div>
        <Cart />
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
          width: 15%;
          border-right: 1px solid #e0e0e0;
        }
        &-product {
          flex: 1;
          &--list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
            padding: 16px;
          }
          &--pagination {
            display: flex;
            justify-content: center;
            padding: 16px;
            }
        }
        &-cart {
          width: 25%;
          border-left: 1px solid #e0e0e0;
        }
      }
    }
  }
</style>
