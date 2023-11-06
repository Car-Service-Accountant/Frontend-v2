import API_URL from '@/utils/apiUrl'
import { loginPorps } from './type'

// Replace this with your actual API implementation
export const loginAPI = async ({ email, password }: loginPorps) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (response.status !== 200) {
    return null
  }
  const result = await response.json()
  if (result) {
    if (result?.role === 'админ') {
      return {
        email: result.email,
        cashBoxID: result.cashBoxId.toString(),
        username: result.username,
        role: result?.role,
        employers: result?.employers,
        token: result?.token,
        companyId: result?.companyId?.toString(),
      }
    } else {
      return {
        email: result.email,
        cashBoxID: result.cashBoxId.toString(),
        username: result.username,
        phoneNumber: result.phoneNumber,
        _id: result?._id?.toString(),
        role: result?.role,
        token: result?.token,
        companyId: result?.companyId.toString(),
      }
    }
  }
  return null
}

export const authenticationAPI = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/protection`, {
    method: 'GET',
    headers: {
      'x-autorization': token,
    },
  })

  if (response.status !== 200) {
    return null
  }
  const result = await response.json()

  if (result) {
    if (result?.role === 'админ') {
      return {
        email: result.email,
        cashBoxID: result.cashBoxID.toString(),
        username: result.username,
        role: result?.role,
        employers: result?.employers,
        token: result?.token,
        companyId: result?._id?.toString(),
      }
    } else {
      return {
        email: result.email,
        cashBoxID: result.cashBoxID.toString(),
        username: result.username,
        phoneNumber: result.phoneNumber,
        _id: result?._id?.toString(),
        role: result?.role,
        token: result?.token,
        companyId: result?.companyId.toString(),
      }
    }
  }
  return null
}
