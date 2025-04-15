const calculateProfitAndCost = (repairs) => {
  let totalCost = 0
  let totalRevenue = 0
  let countRepairs = 0
  let pureProfit = 0

  for (const repair of repairs) {
    if (!repair.paied) continue

    countRepairs++

    let partsCost = 0
    let partsRevenue = 0

    for (const part of repair.parts) {
      partsCost += part.servicePrice
      partsRevenue += part.clientPrice
    }

    totalCost += partsCost
    totalRevenue += partsRevenue + repair.priceForLabor
  }

  pureProfit = totalRevenue - totalCost

  const round = (n) => Math.round(n * 100) / 100

  return {
    totalCost: round(totalCost),
    revenue: round(totalRevenue),
    pureProfit: round(pureProfit),
    countRepairs,
  }
}

export default calculateProfitAndCost
