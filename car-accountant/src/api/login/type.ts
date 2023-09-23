export interface loginPorps {
  email: string
  password: string
}

export interface AdminUser {
  email: string
  cashBoxID: string
  username: string
  phoneNumber: string
  _id: string | undefined
  role: 'админ'
  employers?: string[] | undefined
  token?: string | undefined
  companyId?: string | undefined
}

// Type for non-admin user
export interface NonAdminUser {
  email: string
  cashBoxID: string
  username: string
  phoneNumber: string
  _id: string | undefined
  role: string | undefined
  token?: string | undefined
  companyId?: string | undefined
}
