interface ICategory {
  category_id: number
  category_name: string
  parent: any
  sort: number
}

interface ISubCategory {
  id: number
  category_id: number
  sub_category: string
}

interface ICategoryNode {
  category_id: number
  category_name: string
  sub_category?: { sub_category_id: number; sub_category_name: string }[]
}

interface ICategoryHome {
  category_id: number
  category_name: string
  list_products: {
    id: number
    product_name: string
    description: string
    origin_price: number
    friendly_price: number
    quantity: string
    availability: string
    discount_id: string
    og_url: string
    image: {
      id: number
      image: string
    }[]
    thumbnail: string
  }[]
}

interface IBuffer {
  [key: number]: number
}

interface IId {
  buffer: IBuffer
}

interface ICategoryAll {
  _id: IId | string
  name: string
  parent: ICategoryAll | null
  children: any[]
  deleted_at: null | string
  created_at: string
  updated_at: string
  __v: number
  sort?: number
}

export { ICategory, ISubCategory, ICategoryHome, ICategoryNode, ICategoryAll }
