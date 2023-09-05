interface ICategory {
  category_id: number
  category_name: string
  parent_id: number | null
}

interface ISubCategory {
  id: number
  category_id: number
  sub_category: string
}

interface ICategoryHome {
  category_id: number
  category_name: string
  list_products: {
    id: number
    product_name: string
    description: string
    origin_price: string
    friendly_price: string
    quantity: string
    availability: string
    discount_id: string
    image: {
      id: number
      image: string
    }[]
    thumbnail: string
  }[]
}

export { ICategory, ISubCategory, ICategoryHome }
