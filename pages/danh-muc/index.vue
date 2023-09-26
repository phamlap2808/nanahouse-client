<script setup lang="ts">
  import type { ICategoryNode } from '../../define/category'
  import type { IProduct } from '../../define/product'
  import { useCategoryStore } from '../../store'
  import CategoryTree from 'components/category/category-tree.vue'
  import { Code } from 'define/response-code'

  const listCategory = ref<ICategoryNode[]>([])
  const listProduct = ref<IProduct[]>([])

  const categorySelected = computed({
    get(): { category_id: number; category_name: string } {
      return useCategoryStore().getCategorySelected
    },
    set(val: { category_id: number; category_name: string }) {
      useCategoryStore().setCategorySelected(val)
    }
  })

  const getListCategory = () => {
    const params = new URLSearchParams({
      raw: '1'
    })
    $axios
      .get($endpoint.categoryList, { params })
      .then((res) => {
        const { code, status, data } = res.data
        if (status && code === Code.Success) {
          listCategory.value = data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getProductByCategory = async (categoryId: number) => {
    const params = new URLSearchParams({
      sub_category_id: categoryId.toString()
    })
    const res = await $axios.get($endpoint.productList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listProduct.value = data.products_list
    }
  }

  watch(categorySelected.value, () => {
    if (categorySelected.value.category_id) {
      getProductByCategory(categorySelected.value.category_id)
    }
  })

  onMounted(() => {
    getListCategory()
  })
</script>

<template>
  <v-row class="home-category my-10">
    <v-col xs="12" sm="12" md="4" lg="3">
      <h3 class="mb-4">Danh mục sản phẩm</h3>
      <hr />
      <CategoryTree :tree-data="listCategory" />
    </v-col>
    <v-col xs="12" sm="12" md="8" lg="9">
      <h2 class="mb-10">{{ categorySelected.category_name }}</h2>
      <div class="flex flex-wrap">
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
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
