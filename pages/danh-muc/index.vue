<script setup lang="ts">
  import type { ICategoryNode } from 'define/category'
  import type { IProduct } from 'define/product'
  import { useCategoryStore } from '../../store'
  import { Code } from 'define/response-code'

  const listCategory = ref<ICategoryNode[]>([])
  const listProduct = ref<IProduct[]>([])
  const loading = ref(true)

  const categorySelected = computed({
    get(): { category_id: number; category_name: string } {
      return useCategoryStore().getCategorySelected
    },
    set(val: { category_id: number; category_name: string }) {
      useCategoryStore().setCategorySelected(val)
    }
  })

  const getListCategory = async () => {
    const params = new URLSearchParams({
      raw: '1'
    })
    const res = await $axios.get($endpoint.categoryList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data
      categorySelected.value = {
        category_id: data[0].sub_category[0].sub_category_id,
        category_name: data[0].sub_category[0].sub_category_name
      }
    }
  }

  const getProductByCategory = async (categoryId: number) => {
    loading.value = true
    const params = new URLSearchParams({
      category_id: categoryId.toString()
    })
    try {
      const res = await $axios.get($endpoint.productList, { params })
      const { code, status, data } = res.data
      if (status && code === Code.Success) {
        listProduct.value = data.products_list
      }
    } finally {
      loading.value = false
    }
  }

  watch(
    () => categorySelected.value.category_id,
    (id) => {
      if (id) {
        getProductByCategory(id)
      }
    }
  )

  onMounted(async () => {
    await getListCategory()
    await getProductByCategory(categorySelected.value.category_id)
  })
</script>

<template>
  <v-row class="home-category my-10">
    <v-col xs="12" sm="12" md="4" lg="3">
      <h3 class="mb-4">Danh mục sản phẩm</h3>
      <hr />
      <category-tree :tree-data="listCategory" />
    </v-col>
    <v-col xs="12" sm="12" md="8" lg="9">
      <h2 class="mb-10">{{ categorySelected.category_name }}</h2>
      <div v-loading="loading" class="min-h-100">
        <div v-if="!loading" class="flex flex-wrap">
          <div v-for="product in listProduct" :key="product.id">
            <ProductCard
              :category-id="product.category_id"
              :category-name="product.category_name"
              :product-name="product.title"
              :product-id="product.id"
              :friendly-price="product.friendly_price"
              :thumbnail="product.thumbnail"
              :original-price="product.origin_price"
              :slug="product.og_url" />
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
