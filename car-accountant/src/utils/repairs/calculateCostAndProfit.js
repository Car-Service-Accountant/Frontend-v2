const calculateProfitAndCost = (repairs) => {
  let totalCost = 0
  let profit = 0

  repairs.forEach((repair) => {
    const partsCost = repair.parts.reduce((total, part) => total + part.servicePrice, 0)
    totalCost += partsCost

    const partsProfit = repair.parts.reduce((total, part) => total + (part.clientPrice - part.servicePrice), 0)
    const laborProfit = repair.priceForLabor
    const totalRepairProfit = repair.paied ? partsProfit + laborProfit : 0

    profit += totalRepairProfit
  })

  const pureProfit = profit - totalCost
  return {
    totalCost,
    profit,
    pureProfit,
    countRepairs: repairs.length,
  }
}

export default calculateProfitAndCost
