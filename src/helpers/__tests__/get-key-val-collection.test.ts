import getKeyValCollection from '../get-key-val-collection';

describe('getKeyValCollection', () => {
  const getKVC = getKeyValCollection;
  const statements = [
    {
      key: 'equity',
      value: { quarters: [false, 999], halfyear: [], year: false },
    },
    {
      key: 'producedCost',
      value: { quarters: [12345, 54321], halfyear: [], year: false },
    },
    {
      key: 'salaryExpenses',
      value: { quarters: [154755, 999777], halfyear: [], year: false },
    },
    {
      key: 'assets',
      value: {
        current: { quarters: [], halfyear: [], year: false },
        fixed: { quarters: [], halfyear: [], year: false },
        totalValue: { quarters: [7, 11], halfyear: [], year: false },
      },
    },
    {
      key: 'financials',
      value: {
        netProfit: { quarters: [1000, false], halfyear: [], year: false },
        netLoss: { quarters: [false, 7000], halfyear: [], year: false },
        netIncome: { quarters: [false, 33333], halfyear: [], year: false },
      },
    },
  ];

  it('returns array with key-value pairs; OR paths for financials and/or assets are properly processed (correct values returned)', () => {
    const keys = [
      'netProfit|netLoss',
      'netIncome',
      'assets.totalValue',
      'equity|producedCost',
    ];
    const splitKeys = [
      [
        ['financials', 'netProfit'],
        ['financials', 'netLoss'],
      ],
      [['financials', 'netIncome']],
      [['assets', 'totalValue']],
      [['equity'], ['producedCost']],
    ];
    const result1 = [
      { key: 'netProfit', value: 1000 },
      { key: 'netIncome', value: false },
      { key: 'assets.totalValue', value: 7 },
      { key: 'producedCost', value: 12345 },
    ];
    const result2 = [
      { key: 'netLoss', value: 7000 },
      { key: 'netIncome', value: 33333 },
      { key: 'assets.totalValue', value: 11 },
      { key: 'equity', value: 999 },
    ];

    // @ts-ignore
    const call1 = getKVC(statements, keys, splitKeys, { quarter: 0 });
    // @ts-ignore
    const call2 = getKVC(statements, keys, splitKeys, { quarter: 1 });

    expect(call1).toEqual(result1);
    expect(call2).toEqual(result2);
  });

  it('returns array with key-value pairs if called without splitKeys', () => {
    const keys = ['equity', 'producedCost'];
    const result = [
      { key: 'equity', value: 999 },
      { key: 'producedCost', value: 54321 },
    ];
    // @ts-ignore
    const call = getKVC(statements, keys, undefined, { quarter: 1 });

    expect(call).toEqual(result);
  });

  it('omits OR path if called without splitKeys - only value(s) for single path(s) returned', () => {
    const keys = ['equity|producedCost', 'salaryExpenses', 'equity'];
    const result = [
      { key: 'equity', value: 999 },
      { key: 'salaryExpenses', value: 999777 },
    ];
    // @ts-ignore
    const call = getKVC(statements, keys, undefined, { quarter: 1 });

    expect(call).toEqual(result);
  });

  it('returns empty array if called without splitKeys and keys includes only OR path', () => {
    const keys = ['equity|producedCost'];
    // @ts-ignore
    const call = getKVC(statements, keys, undefined, { quarter: 1 });

    expect(call).toEqual([]);
  });
});
