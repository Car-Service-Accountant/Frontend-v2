const finishedYearBefore = (repairs) => {
  const today = new Date()
  const startOfYearBefore = new Date(today.getFullYear() - 1, 1)

  const repairsInYearBefore = repairs.filter((repair) => {
    const repairDate = new Date(repair.endDate)

    return repair.paied === true && repairDate.getFullYear() === startOfYearBefore.getFullYear()
  })

  let laborSum = 0
  let priceDiffSum = 0
  for (const repair of repairsInYearBefore) {
    laborSum += repair.priceForLabor
    for (const part of repair.parts) {
      priceDiffSum += part.clientPrice - part.servicePrice
    }
  }

  return {
    totalProfitForYearBefore: laborSum,
    priceDiffSum,
    repairsInYearBefore: repairsInYearBefore.length,
    laborSum,
  }
}

export default finishedYearBefore
