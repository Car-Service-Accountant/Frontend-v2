import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { formatDate } from '../dataformat'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const calculatePureProfit = (repair) => {
  const partsProfit = repair.parts.reduce((total, part) => total + (part.clientPrice - part.servicePrice), 0)
  const totalProfit = repair.priceForLabor + partsProfit
  return `${totalProfit.toFixed(2)} лв.`
}

const findRepairsInDateRangeAndSort = (cars, startDate, endDate) => {
  const allRepairs = []

  cars.forEach((car) => {
    car.repairs
      .filter((repair) => {
        const createDate = dayjs(repair.createDate)
        return createDate.isSameOrAfter(startDate, 'day') && createDate.isSameOrBefore(endDate, 'day')
      })
      .forEach((repair) => {
        const repairWithCarInfo = {
          ...repair,
          createDate: formatDate(repair.createDate),
          carNumber: car.carNumber,
          carMark: car.carMark,
          carModel: car.carModel,
          owner: car.owner,
          phoneNumber: car.phoneNumber,
          pureProfit: calculatePureProfit(repair),
        }
        allRepairs.push(repairWithCarInfo)
      })
  })

  const sortedRepairs = allRepairs.sort((a, b) => (dayjs(b.createDate).isBefore(dayjs(a.createDate)) ? -1 : 1))

  const result = sortedRepairs.map((repair) => ({
    ...repair,
    pureProfit: calculatePureProfit(repair),
  }))

  return result
}

export default findRepairsInDateRangeAndSort
