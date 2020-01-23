export const getDataArray = (filterChartData, address) => {
  var amountArray = [];

  filterChartData = filterChartData.sort(function (a, b) {          //sorting input data by timestamp
    return a.time - b.time;
  })
  let sum = 0;
  filterChartData.forEach(function (data) {
    sum += calculateValue(data, address)
    amountArray.push({ x: data.time, y: sum, blockheight: data.blockheight })
  })
  return amountArray;
}

export const calculateSumVin = (vin, address) => {
  let sum = 0;
  vin.forEach((transaction) => {
    if (transaction.addresses.findIndex((addrss) => {
      return addrss === address
    }) !== -1) {
      sum += parseFloat(transaction.value);
    }
  })
  return sum;
}

export const calculateSumVout = (vout, address) => {
  let sum = 0;
  vout.forEach((transaction) => {
    if (transaction.scriptPubKey.addresses.findIndex((addrss) => {
      return addrss === address
    }) !== -1) {
      sum += parseFloat(transaction.value);
    }
  })

  return sum;
}

export const calculateValue = (transaction, address) => {
  return (calculateSumVout(transaction.vout, address) - calculateSumVin(transaction.vin, address));
}
