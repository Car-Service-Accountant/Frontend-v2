import { carRequest } from '@/features/redux/cars/types'
import API_URL from '@/utils/apiUrl'

export const fetchAllCars = async (companyId: string) => {
  try {
    const response = await fetch(`${API_URL}/car`, {
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
  const response = await fetch(`${API_URL}/car`, {
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
  const response = await fetch(`${API_URL}/car/${selectedId}`, {
    method: 'DELETE',
  })
  if (response && response.status === 200) {
    return selectedId
  }
  return null
}

export const fetchSingleCar = async (_id: string, companyId: string) => {
  const response = await fetch(`${API_URL}/car/${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Company-ID': companyId,
    },
  })
  if (response.status === 200) {
    const result = await response.json()

    return result
  }
  return null
}

export const updateCar = async (carId: string, data: any) => {
  const response = await fetch(`${API_URL}/car/update/${carId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update car')
  }

  return await response.json()
}
