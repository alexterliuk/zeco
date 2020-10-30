import { getStatementsTemplate } from '../build-company-profile';

describe('getStatementsTemplate', () => {
  it('returns object each key || (assets || financials)[key] of which points to `{ halfyear: [], quarters: [], year: false }`', () => {
    const item = { halfyear: [], quarters: [], year: false };
    const result = getStatementsTemplate();
    const root = [result, ['equity', 'producedCost', 'salaryExpenses']];
    const assets = [result.assets, ['current', 'fixed', 'totalValue']];
    const financials = [
      result.financials,
      [
        'netProfit',
        'netLoss',
        'grossProfit',
        'grossLoss',
        'netIncome',
        'profitGrowth',
        'incomeGrowth',
        'ebitda',
        'ebitdaMargin',
      ],
    ];

    const testSets = [root, assets, financials];
    for (const set of testSets) {
      // @ts-ignore
      for (const key of set[1]) {
        // @ts-ignore
        expect(set[0][key]).toEqual(item);
      }
    }
  });
});
