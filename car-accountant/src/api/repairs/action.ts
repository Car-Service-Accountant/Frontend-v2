import { payedRepairData, repairRequest } from '@/features/redux/repairs/types'
import API_URL from '@/utils/apiUrl'

export const fetchAllRepairs = async (companyId: string) => {
  try {
    const response = await fetch(`${API_URL}/repair`, {
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

export const fetchSingleRepair = async ({ companyId, repairID }: { companyId: string; repairID: string }) => {
  const response = await fetch(`${API_URL}/repair/${repairID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Company-ID': companyId,
    },
  })

  return response
}

export const repairDelete = async ({ ID }: { ID: string }) => {
  const response = fetch(`${API_URL}/repair/${ID}`, {
    method: 'DELETE',
  })

  return response
}

export const sendRepair = async ({ carId, data }: { carId: string; data: repairRequest }) => {
  const response = await fetch(`${API_URL}/repair/${carId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}

export const payRepair = async ({ repID, data }: { repID: string; data: payedRepairData }) => {
  const response = await fetch(`${API_URL}/repair/finished/${repID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}
