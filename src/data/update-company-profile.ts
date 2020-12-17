import { getStatementsTemplate } from './build-company-profile';
import { CompanyProfile, FinancialStatements } from './data';

/**
 *
 * @param {object} companyProfile
 * @param {array} statementsSets
 */
function updateCompanyProfile(
  companyProfile: CompanyProfile,
  statementsSets: { [key: string]: string[] }[]
) {
  const colNamesRows = statementsSets.map(set => set.colNames.slice(1));
  const sameColNames = areRowsIdentical(colNamesRows);
  if (!sameColNames && sameColNames !== undefined) {
    console.error(
      'No update, because colNames in statementsSets (first rows) are not identical.'
    );
    return;
  }

  statementsSets.forEach(set => {
    const names = Object.keys(set).filter(n => n !== 'colNames');
    names.forEach(name => {
      const row = { name, data: set[name].slice(1) };
      addDataToCompanyProfile(companyProfile, row, colNamesRows[0]);
    });
  });
}

/**
 * Input in data contains values for time periods (which are columns).
 * Search for corresponding fields in a company profile and add values.
 * @param companyProfile
 * @param row
 * @param periods
 */
function addDataToCompanyProfile(
  companyProfile: CompanyProfile,
  row: { name: string; data: string[] },
  periods: string[]
) {
  const parsedPeriods = periods.map(p => parsePeriod(p));

  row.data.forEach((cellVal: string, i: number) => {
    const cellValNum = strToNum(cellVal);
    const year = parsedPeriods[i].year;
    const quarter = parsedPeriods[i].quarter;
    const statements = companyProfile.statements;
    if (!statements[year]) {
      statements[year] = <FinancialStatements>getStatementsTemplate();
    }

    let asset = row.name.includes('assets') && row.name.slice(6);
    if (asset) asset = asset[0].toLowerCase() + asset.slice(1);
    const name = asset || row.name;
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
    const financial = financialsNames.includes(name) && name;
    const statement = asset
      ? // @ts-ignore
        statements[year].assets[asset]
      : financial
      ? // @ts-ignore
        statements[year].financials[name]
      : // @ts-ignore
        statements[year][name];

    if (statement) {
      if (quarter || quarter === 0) {
        statement.quarters[quarter] = cellValNum;
      } else {
        statement.year = cellValNum;
      }
    }
  });
}

/**
 *
 * @param {array} rows - with arrays of strings
 */
function areRowsIdentical(rows: string[][]) {
  if (rows.length < 2) return;

  return rows[0].every((cell, i) => {
    for (let y = 1; y < rows.length; y++) {
      if (cell !== rows[y][i]) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Parse time period. Expected input - a year or a year with a quarter:
 *   '2020', '2020 I', '2020 II', '2020 III', '2020 IV'
 * @param {string} period
 */
function parsePeriod(period: string): ParsedTimePeriod {
  const split = period.split(' ');
  const parsed: ParsedTimePeriod = { year: +split[0] };
  const quarters: { [key: string]: '0' | number } = {
    I: '0',
    II: 1,
    III: 2,
    IV: 3,
  };

  if (quarters[split[1]]) {
    parsed.quarter = +quarters[split[1]];
  }

  return parsed;
}

/**
 * Expected string formats: '2548', '2 584', '25.8%', '25,8' or such negative.
 * If number is NaN, or Infinity, 'INVALID' is returned.
 * @param {string | number} v
 */
function strToNum(v: string | number) {
  const retNum = (n: number) => (Number.isFinite(n) ? n : 'INVALID');

  if (typeof v === 'string') {
    if (v.includes('%')) return v;
    // sometimes stringified number may include comma, fix it
    v = v.replace(',', '.');
    const num = +Number(v.split(/\s/).join('')).toFixed();
    if (!Number.isFinite(num)) {
      if (v === '-') return false;
    }
    return retNum(num);
  }

  return retNum(v);
}

/**
 * usreou format is string of length 8 composed with only numbers.
 * Ukrainian abbreviation of usreou is ebitda.
 * @param {string | number} strOrNum
 */
function toUsreou(strOrNum: string | number): string | false {
  let str = '' + strOrNum;
  const split = str.split('');
  const valid = split.every(s => /\d/.test(s));
  if (!split.length || !valid || str.length > 8) {
    return false;
  }

  while (str.length !== 8) str = '0' + str;

  return str;
}

export interface ParsedTimePeriod {
  year: number;
  quarter?: number;
}

export default updateCompanyProfile;
export { toUsreou };
