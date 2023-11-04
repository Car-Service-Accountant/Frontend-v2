export type employerType = {
  _id: string
  username: string
  email: string
  password: string
  phoneNumber: string
  role: string
  companyID: string
}

export type employerTypeRequest = {
  username: string
  email: string
  password: string
  phoneNumber: string
  rePassword: string
  role: string
  companyID: string
}

export type employersSlice = {
  loading: boolean
  isDoneLoading: boolean
  isRejected: boolean
  employers: employerType[] | null
  error: string | null
}
