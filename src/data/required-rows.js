const requiredRows = {
  zaginfo: [
    { i: 0, name: 'colNames' },
    { i: 4, name: 'ebitda' },
    { i: 5, name: 'ebitdaMargin' },
  ],
  zvit: [
    { i: 0, name: 'colNames' },
    { i: 1, name: 'netIncome' },
    { i: 7, name: 'producedCost' },
    { i: 9, name: 'grossProfit' },
    { i: 10, name: 'grossLoss' },
    { i: 40, name: 'netProfit' },
    { i: 41, name: 'netLoss' },
    { i: 52, name: 'salaryExpenses' },
  ],
  fincoeff: [
    { i: 0, name: 'colNames' },
    { i: 15, name: 'incomeGrowth' },
    { i: 16, name: 'profitGrowth' },
  ],
  balance: [
    { i: 0, name: 'colNames' },
    { i: 5, name: 'assetsFixed' },
    { i: 49, name: 'assetsCurrent' },
    { i: 51, name: 'assetsTotalValue' },
    { i: 63, name: 'equity' },
  ],
};

module.exports = requiredRows;
