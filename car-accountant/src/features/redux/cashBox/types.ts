export interface cashBoxType {
  _id?: string
  totalAmount: number
  totalForMonth: number
  additionalCosts: number
  employersSellary: number
  profit: number
  cost: number
}

export interface cashBoxInterface {
  loading: boolean
  isDoneAuthenticated: boolean
  upToDate: boolean
  cashBox: cashBoxType | null
  error: string | null
}
