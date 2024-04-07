<script setup lang="ts">
  import type { ICategoryHome } from '../define/category'
  import type { IBlog } from 'define/blog'
  import ProductCard from '../components/product/product-card.vue'
  import { Code } from 'define/response-code'
  import { useSystemStore } from '@/store'

  const systemStore = useSystemStore()
  const loading = ref(true)

  const listCarousel = ref<IBlog[]>([])
  const listHomeCategory = ref<ICategoryHome[]>([])

  const getCarousel = async () => {
    const params = new URLSearchParams({ status: '2' })
    const res = await $axios.get($endpoint.blogList, { params })
    const { code, status, data } = res.data
    if (status && code === Code.Success) {
      listCarousel.value = data.blogs_list
    }
  }

  const getListCategoryHome = async () => {
    const res = await $axios.get($endpoint.listCategoryHome)
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
      <v-carousel :touch="true">
        <template #prev="{ props }">
          <div class="rounded-full bg-white" @click="props.onClick">
            <v-icon icon="mdi-chevron-left" size="40" color="#fc6ba6" />
          </div>
        </template>
        <template #next="{ props }">
          <div class="rounded-full bg-white" @click="props.onClick">
            <v-icon icon="mdi-chevron-right" size="40" color="#fc6ba6" />
          </div>
        </template>
        <v-carousel-item v-for="item in listCarousel" :key="item.id" :src="item.thumbnail" aspect-ratio="4/3" cover />
      </v-carousel>
    </div>
    <!--    home-category-->
    <div class="home-page__category mt-15">
      <v-sheet v-for="category in listHomeCategory" :key="category.category_id" class="mb-15">
        <div v-if="category.list_products.length > 0">
          <h3 class="mb-4">{{ category.category_name }}</h3>
          <v-slide-group prev-icon="mdi-chevron-left-circle" next-icon="mdi-chevron-right-circle" show-arrows>
            <v-slide-group-item v-for="product in category.list_products" :key="product.id">
              <ProductCard
                class="mr-4"
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
