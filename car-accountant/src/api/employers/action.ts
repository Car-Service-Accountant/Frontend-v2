const URL = 'http://localhost:3005'

export const fetchAlLEmployers = async (companyId: string) => {
  try {
    const response = await fetch(`${URL}/employers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Company-ID': companyId,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (response) {
      return response
    }
  } catch (error) {
    console.error('Need to set popup here to shown error')
  }
}

export const deleteEmployer = async (selectedId: string) => {
  try {
    const response = await fetch(`${URL}/employers/${selectedId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (response) {
      return response
    }
  } catch (err) {
    console.error('Need to set popup here to shown error')
  }
}
