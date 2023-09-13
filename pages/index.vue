<script setup lang="ts">
  import type { ICategoryHome } from '../define/category'
  import type { IBlog } from 'define/blog'
  import ProductCard from '../components/product/product-card.vue'
  import { useSystemStore } from '@/store'
  import { Code } from 'define/response-code'

  const systemStore = useSystemStore()
  const loading = ref(true)

  const listCarousel = ref<IBlog[]>([])
  const listHomeCategory = ref<ICategoryHome[]>([])

  const getCarousel = async () => {
    const params = new URLSearchParams({ status: '2' })
    const res = await $axios.get($endpoint.blogList, { params })
    console.log('11111111111111111', res)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCarousel.value = data.blogs_list
    }
  }

  const getListCategoryHome = async () => {
    const res = await $axios.get($endpoint.listCategoryHome)
    console.log('22222222222222222', res)
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listHomeCategory.value = data
    }
  }

  getCarousel()
  getListCategoryHome()

  // onMounted(() => {
  //   loading.value = true
  //   getCarousel()
  //   getListCategoryHome()
  //   loading.value = false
  // })
</script>

<template>
  <div class="home-page">
    <!--    home-carousel-->
    <div v-if="listCarousel[0]" class="home-page__carousel">
      <v-carousel touch>
        <v-carousel-item v-for="item in listCarousel" :key="item.id" :src="item.thumbnail" aspect-ratio="4/3" cover />
      </v-carousel>
    </div>
    <!--    home-category-->
    <div class="home-page__category my-10">
      <v-sheet v-for="category in listHomeCategory" :key="category.category_id">
        <div v-if="category.list_products.length > 0">
          <h3 class="mb-4">{{ category.category_name }}</h3>
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="product in category.list_products" :key="product.id">
              <ProductCard
                :category-id="category.category_id"
                :category-name="category.category_name"
                :product-name="product.product_name"
                :product-id="product.id"
                :friendly-price="product.friendly_price"
                :thumbnail="product.thumbnail"
                :original-price="product.origin_price"
                :slug="product.og_url" />
            </v-slide-group-item>
          </v-slide-group>
        </div>
      </v-sheet>
    </div>
  </div>
</template>
