/**
 *
 * @param {string} id
 * @param {string} shortName
 * @param {number} usreou
 * @param {number} [year]
 */
function buildCompanyProfile(
  id: string,
  shortName: string,
  usreou: number,
  year?: number
) {
  if (id && shortName && usreou) {
    return {
      id,
      name: '',
      shortName,
      usreou,
      location: '',
      industry: '',
      statements: {
        [year || 2020]: getStatementsTemplate(year || 2020),
      },
    };
  }
}

/**
 *
 * @param {number} year
 */
function getStatementsTemplate(year: number) {
  const _year = Number.isFinite(year) && year > 2009 ? year : 2020;
  const assetsNames = ['totalValue', 'current', 'fixed'];
  const financialsNames = [
    'netIncome',
    'incomeGrowth',
    'grossProfit',
    'netProfit',
    'netProfitMargin',
    'profitGrowth',
    'ebitda',
    'ebitdaMargin',
  ];
  const names = [
    ['assets', assetsNames],
    'avgWorkforce',
    'equity',
    'payables',
    'producedCost',
    ['financials', financialsNames],
  ];

  return composeStatementsTemplate(names);
}

function getOneStatementTemplate() {
  return {
    quarters: [],
    halfyear: [],
    year: false,
  };
}

/**
 *
 * @param {array} names
 */
function composeStatementsTemplate(names: (string | (string | string[])[])[]) {
  return names.reduce((acc: { [key: string]: object }, n: any) => {
    const arr = Array.isArray(n);
    const currName = arr ? n[0] : n;
    acc[currName] = arr
      ? composeStatementsTemplate(n[1])
      : getOneStatementTemplate();
    return acc;
  }, {});
}

export default buildCompanyProfile;
export { getStatementsTemplate };
