const today = new Date();
const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

const dataCalulatorForLiveData = (repairs) => {
    const totalData = {};
    const combinedData = [];
    if (repairs) {
        for (const repair of repairs) {
            const endDate = new Date(repair.endDate);

            if (endDate >= oneWeekAgo && endDate <= today) {
                const day = endDate.toISOString().substring(0, 10);
                let partsProfit = 0;
                let partsTotalCost = 0;
                let priceForLabor = 0;
                for (const part of repair.parts) {
                    const priceDifference = part?.clientPrice - part?.servicePrice;
                    partsProfit += priceDifference;
                    partsTotalCost += part?.servicePrice
                }

                priceForLabor = repair?.priceForLabor

                if (!totalData[day]) {
                    totalData[day] = {
                        data: formatDate(day),
                        totalProfitFromParts: partsProfit,
                        totalPartCosts: partsTotalCost,
                        totalPriceForLabor: priceForLabor,
                    };
                } else {
                    totalData[day].totalProfitFromParts += partsProfit;
                    totalData[day].totalPartCosts += partsTotalCost;
                    totalData[day].totalPriceForLabor += priceForLabor;
                }
            }
        }

        for (const day in totalData) {
            if (Object.prototype.hasOwnProperty.call(totalData, day)) {
                combinedData.push({
                    date: totalData[day].data,
                    totalProfitFromParts: totalData[day].totalProfitFromParts,
                    totalPartCosts: totalData[day].totalPartCosts,
                    totalPriceForLabor: totalData[day].totalPriceForLabor,
                });
            }
        }
        combinedData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    }
    return {
        combinedData
    }

}

export default dataCalulatorForLiveData

export function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}.${day}.${year}`;
}