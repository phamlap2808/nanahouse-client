interface IBlog {
  id: number
  content: string
  start_at: string
  end_at: string
  seo_description: string
  seo_title: string
  status: number
  thumbnail: string
  title: string
  description: string
  og_url: string
  og_title: string
  og_description: string
  og_image: string
  twitter_title: string
  twitter_description: string
  twitter_image: string
  twitter_card: string
}

interface IBlogCreate {
  content: string
  status: number
  thumbnail: string
  title: string
  description: string
  og_url: string
  og_title: string
  og_description: string
}

export {
  IBlog,
  IBlogCreate
}