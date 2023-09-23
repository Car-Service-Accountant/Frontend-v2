export interface userInterface {
  email: string
  cashBoxID: string
  _id: string | undefined
  username: string | undefined
  role: string | undefined
  companyId?: string | undefined
  employers?: string[] | undefined
  token?: string | undefined
}

export interface requestProps {
  loading: boolean
  error: null | string
}

export interface credentials {
  email: string
  password: string
}

export type AuthState = {
  loading: boolean
  isDoneAuthenticated: boolean
  user: userInterface | null
  error: string | null
}
