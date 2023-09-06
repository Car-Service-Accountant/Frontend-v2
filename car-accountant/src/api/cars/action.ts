import { carRequest } from '@/features/redux/cars/types'

const URL = 'http://localhost:3005'

export const fetchAllCars = async (companyId: string) => {
  console.log('companyId in cars ==> ', companyId)

  try {
    const response = await fetch(`${URL}/car`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Company-ID': companyId,
      },
    })
    console.log('response in cars ==> ', response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = response.json()

    if (result) {
      return result
    }
  } catch (error) {
    console.error('Need to set popup here to shown error')
  }
}

export const addCar = async (data: carRequest) => {
  const response = await fetch(`${URL}/car`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (response && response.status === 200) {
    return true
  }
  return false
}
