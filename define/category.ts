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

export {
  ICategory,
  ISubCategory
}