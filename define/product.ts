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
  SKU: string
  description: string
  og_title: string
  og_description: string
  og_image: string
  og_url: string
  image: { id: number; image: string }[]
  thumbnail_id: number
  thumbnail: string
}

interface IProductCreate {
  SKU: string
  title: string
  description: string
  category_id: number | null
  origin_price: number | null
  friendly_price: number | null
  quantity: number | null
  availability: number | null
  thumbnail: string | Blob
  image: (string | Blob | { id: number; image: string })[]
  og_title: string
  og_description: string
  og_url: string
}

export { IProduct, IProductCreate }
