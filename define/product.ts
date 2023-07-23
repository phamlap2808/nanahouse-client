interface IProduct {
  id: number
  name: string // bỏ -> name với title là 1
  category_id: number // trả thêm cho a cái category name
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

export {
  IProduct
}