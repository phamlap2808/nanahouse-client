import type { IProductDetail } from './product'
interface ICategory {
  category_id: number
  category_name: string
  parent: any
  sort: number | null
}

interface ISubCategory {
  id: number
  category_id: number
  sub_category: string
}

interface ICategoryNode {
  _id: number
  name: string
  children?: ICategoryNode[]
}

interface ICategoryHome {
  _id: string
  name: string
  sort: number
  products: IProductDetail[]
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
