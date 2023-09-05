export interface userInterface {
  isLogedIn: false
  _id: ''
  username: ''
  role: ''
  companyId: ''
  employers: ''
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
