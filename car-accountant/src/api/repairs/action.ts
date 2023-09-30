import { payedRepairData, repairRequest } from '@/features/redux/repairs/types'

const URL = 'http://localhost:3005'

export const fetchAllRepairs = async (companyId: string) => {
  try {
    const response = await fetch(`${URL}/repair`, {
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

export const sendRepair = async ({ carId, data }: { carId: string; data: repairRequest }) => {
  const response = await fetch(`${URL}/repair/${carId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}

export const payRepair = async ({ repID, data }: { repID: string; data: payedRepairData }) => {
  const response = await fetch(`${URL}/repair/finished/${repID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}
