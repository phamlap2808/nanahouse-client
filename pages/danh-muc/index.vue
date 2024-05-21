<script setup lang="ts">
  import type { ICategoryNode } from '../../define/category'
  import type { IProduct } from '../../define/product'
  import { Code } from '../../define/response-code'
  import { useCategoryStore } from '../../store'

  const listCategory = ref<ICategoryNode[]>([])
  const listProduct = ref<IProduct[]>([])
  const loading = ref(true)
  const currentPage = ref(1)
  const totalPage = ref(0)
  const totalPageRecord = ref(10)
  const totalRecord = ref(0)

  const categorySelected = computed({
    get(): { _id: number; name: string } {
      return useCategoryStore().getCategorySelected
    },
    set(val: { _id: number; name: string }) {
      useCategoryStore().setCategorySelected(val)
    }
  })

  const getListCategory = async () => {
    const res = await $axios.get($endpoint.categoryMenu)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCategory.value = data
      categorySelected.value = { _id: data[0]._id, name: data[0].name }
    }
  }

  const getProductByCategory = async (categoryId: string) => {
    loading.value = true
    const params = new URLSearchParams({
      category: categoryId,
      current_page: currentPage.value.toString(),
      page_record: totalPageRecord.value.toString()
    })
    try {
      const res = await $axios.get($endpoint.productList, { params })
      const { code, status, data } = res.data
      if (status && code === Code.Success) {
        listProduct.value.length = 0
        listProduct.value = data.data
        currentPage.value = data.current_page
        totalPage.value = data.total_page
        totalPageRecord.value = data.total_page_record
        totalRecord.value = data.total_record
      }
    } finally {
      loading.value = false
    }
  }

  watch(
    () => categorySelected.value._id,
    (id) => {
      if (id) {
        getProductByCategory(id)
      }
    }
  )

  // watch(currentPage, async () => {
  //   await getProductByCategory(categorySelected.value._id)
  // })

  onMounted(async () => {
    await getListCategory()
    await getProductByCategory(categorySelected.value._id)
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
      <h2 class="mb-10">{{ categorySelected.name }}</h2>
      <div v-loading="loading" class="min-h-100 flex flex-col gap-4">
        <div v-if="!loading" class="flex flex-wrap gap-4">
          <div v-for="product in listProduct" :key="product.id">
            <ProductCard
              :category-id="product.category._id"
              :category-name="product.category.name"
              :product-name="product.title"
              :product-id="product._id"
              :friendly-price="product.friendly_price"
              :thumbnail="product.thumbnail"
              :original-price="product.origin_price"
              :slug="product.og_url" />
          </div>
        </div>
        <v-pagination v-model="currentPage" :length="totalPage" :total-visible="7" />
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>