const URL = 'http://localhost:3005'

export const fetchCashBox = async (id: string) => {
  const response = await fetch(`${URL}/cashbox/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response) {
    return response
  }
}
