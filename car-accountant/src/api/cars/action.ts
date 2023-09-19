import { carRequest } from '@/features/redux/cars/types'

const URL = 'http://localhost:3005'

export const fetchAllCars = async (companyId: string) => {
  try {
    const response = await fetch(`${URL}/car`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Company-ID': companyId,
      },
    })

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
  const result = await response.json()

  if (response && response.status === 200) {
    return result
  }
  return result
}

export const deleteCar = async (selectedId: string) => {
  const response = await fetch(`${URL}/car/${selectedId}`, {
    method: 'DELETE',
  })
  if (response && response.status === 200) {
    return selectedId
  }
  return null
}

export const fetchSingleCar = async (_id: string, companyId: string) => {
  const response = await fetch(`${URL}/car/${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Company-ID': companyId,
    },
  })
  if (response.status === 200) {
    const result = await response.json()
    console.log('result =>', result)

    return result
  }
  return null
}
