import buildCompanyProfile from '../build-company-profile';

describe('buildCompanyProfile if called with', () => {
  it('not enough arguments, returns undefined', () => {
    // @ts-ignore
    expect(buildCompanyProfile('bla')).toBe(undefined);
    // @ts-ignore
    expect(buildCompanyProfile('bla', 'wla')).toBe(undefined);
  });

  const item = { quarters: [], year: false };
  const result = {
    id: 'a',
    shortName: 'b',
    usreou: '00000012',
    name: ``,
    industry: ``,
    location: ``,
    statements: {
      2020: {
        assets: {
          current: item,
          fixed: item,
          totalValue: item,
        },
        equity: item,
        producedCost: item,
        salaryExpenses: item,
        financials: {
          netProfit: item,
          netLoss: item,
          grossProfit: item,
          grossLoss: item,
          netIncome: item,
          profitGrowth: item,
          incomeGrowth: item,
          ebitda: item,
          ebitdaMargin: item,
        },
      },
    },
  };

  it('(`a`, `b`, 12), returns { id: `a`, shortName: `b`, usreou: `00000012`, name: ``, industry: ``, location: ``, statements: { 2020: FinancialStatements }}', () => {
    expect(buildCompanyProfile('a', 'b', 12)).toEqual(result);
  });

  it('(`a`, `b`, 12, 2016), returns same obj as in prev example but with statements to be { 2016: FinancialStatements }', () => {
    const result1 = JSON.parse(JSON.stringify(result));
    result1.statements[2016] = result1.statements[2020];
    delete result1.statements[2020];
    expect(buildCompanyProfile('a', 'b', 12, 2016)).toEqual(result1);
  });

  it('(`a`, `b`, `bb`), returns undefined because usreou is not valid', () => {
    expect(buildCompanyProfile('a', 'b', 'bb')).toBe(undefined);
  });
});
