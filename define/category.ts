interface ICategory {
  id: number
  name: string
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