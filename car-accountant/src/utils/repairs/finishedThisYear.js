const finishedThisYear = (repairs) => {
  const currentYear = new Date().getFullYear()
  const repairsThisYear = repairs.filter((repair) => {
    const endDate = new Date(repair.endDate)
    return (repair.paied === true && endDate.getFullYear()) === currentYear
  })

  const totalLabor = repairsThisYear.reduce((total, repair) => total + repair.priceForLabor, 0)

  const totalPartsDifference = repairsThisYear.reduce((total, repair) => {
    const partsDifference = repair.parts.reduce((total, part) => total + (part.clientPrice - part.servicePrice), 0)
    return total + partsDifference
  }, 0)

  return {
    totalProfitForThisYear: totalLabor + totalPartsDifference,
    repairsThisYear: repairsThisYear.length,
    totalLabor,
    totalPartsDifference,
  }
}

export default finishedThisYear
