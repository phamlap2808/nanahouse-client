interface IProduct {
  id: number
  category_id: number
  category_name: string
  origin_price: number
  friendly_price: number
  quantity: number
  availability: number
  discount: number
  title: string
  sku: string
  description: string
  og_title: string
  og_description: string
  og_image: string
  og_url: string
  images: string[]
  thumbnail: string
}

interface IProductDetail extends IProduct {
  variant: IProduct
}

interface IProductCreate {
  sku: string
  title: string
  description: string
  category_id: number | null
  origin_price: number | null
  friendly_price: number | null
  quantity: number | null
  availability: number | null
  thumbnail: string | Blob
  images: (string | Blob)[]
  og_title: string
  og_description: string
  og_url: string
  variant_id: string
}

interface ProductOrigin {
  _id: string
  title: string
  sku: string
  origin_price: number
  friendly_price: number
  quantity: number
  availability: number
  og_title: string
  og_url: string
  thumbnail: string
  images: string[]
  category: {
    buffer: {
      [key: number]: number
    }
  }
  variant: null
  deleted_at: null
  created_at: string
  updated_at: string
  __v: number
  description?: string
  og_description?: string
}

export { IProduct, IProductCreate, IProductDetail, ProductOrigin }
