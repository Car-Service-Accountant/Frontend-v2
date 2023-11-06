import { cashBoxType } from '@/features/redux/cashBox/types'
import API_URL from '@/utils/apiUrl'

export const fetchCashBox = async (id: string) => {
  const response = await fetch(`${API_URL}/cashbox/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response) {
    return response
  }
}

export const updateCashBox = async (cashBoxID: string, data: cashBoxType) => {
  const response = await fetch(`${API_URL}/cashbox/${cashBoxID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  console.log('response => ', response)

  return response
}
