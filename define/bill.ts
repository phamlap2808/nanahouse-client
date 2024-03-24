import type { IOrder } from './order'

interface IListBill {
  bill_id: number
  cart_id: number
  total_amout: string
  bill_status: number
  export_bill_at: string
  user_infor: {
    name: string
    phone_number: string
    email: string
  }
  orders: IOrder[]
}

interface IListBillResponse {
  total_page: number
  total_page_record: number
  total_record: number
  current_page: number
  list_bill: IListBill[]
}

export type { IListBill, IListBillResponse }
