interface IListPurchase {
  cart_id: number
  cart_status: number
  address: string
  type_of_customer: number
  ordered_at: string
  user_info: {
    name: string
    phone_number: string
    email: string
  }
  orders: {
    order_id: number
    product_id: number
    product_name: string
    price: number
    amount: number
  }[]
  total_amount: number
}

interface IOrderList {
  total_page: number
  total_page_record: number
  total_record: number
  current_page: number
  list_purchase: IListPurchase[]
}

export { IOrderList, IListPurchase }
