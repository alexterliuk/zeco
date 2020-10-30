import {
  CompanyProfile,
  FinancialStatements,
  FinancialStatement,
} from './data';

/**
 *
 * @param {string} id
 * @param {string} shortName
 * @param {number} usreou - edrpou in Ukrainian
 * @param {number} [year]
 */
function buildCompanyProfile(
  id: string,
  shortName: string,
  usreou: number | string,
  year?: number
): CompanyProfile | undefined {
  if (id && shortName && usreou) {
    return {
      id,
      name: '',
      shortName,
      usreou,
      location: '',
      industry: '',
      // @ts-ignore due to recursive nature of composeStatementsTemplate
      // which makes either FinancialStatements or Partial of it
      statements: {
        [year || 2020]: getStatementsTemplate(),
      },
    };
  }
}

/**
 *
 */
function getStatementsTemplate() {
  const assetsNames = ['current', 'fixed', 'totalValue'];
  const financialsNames = [
    'netProfit',
    'netLoss',
    'grossProfit',
    'grossLoss',
    'netIncome',
    'profitGrowth',
    'incomeGrowth',
    'ebitda',
    'ebitdaMargin',
  ];
  const names = [
    ['assets', assetsNames],
    'equity',
    'producedCost',
    'salaryExpenses',
    ['financials', financialsNames],
  ];

  return composeStatementsTemplate(names);
}

function getOneStatementTemplate(): FinancialStatement {
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
function composeStatementsTemplate(
  names: (string | (string | string[])[])[]
): Partial<FinancialStatements> {
  return names.reduce(
    (acc: { [key: string]: {} | FinancialStatement }, n: any) => {
      const arr = Array.isArray(n);
      const currName = arr ? n[0] : n;
      acc[currName] = arr
        ? composeStatementsTemplate(n[1])
        : getOneStatementTemplate();
      return acc;
    },
    {}
  );
}

export default buildCompanyProfile;
export { getStatementsTemplate };
