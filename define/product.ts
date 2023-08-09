interface IProduct {
  id: number
  name: string
  category_id: number
  category_name: string
  origin_price: number
  friendly_price: number
  quantity: number
  availability: number
  discount: number
  title: string
  description: string
  og_title: string
  og_description: string
  og_image: string
  og_url: string
  twitter_title: string
  twitter_description: string
  twitter_image: string
  twitter_card: string
  image: { id: number; image: string }[]
  thumbnail_id: number
  thumbnail: string
}

interface IProductCreate {
  title: string
  description: string
  category_id: number | null
  origin_price: number | null
  friendly_price: number | null
  quantity: number | null
  availability: number | null
  thumbnail: string | Blob
  image: (string | Blob)[]
  og_title: string
  og_description: string
  og_url: string
}

export {
  IProduct,
  IProductCreate
}