import { getStatementsTemplate } from './build-company-profile';

/**
 *
 * @param {object} companyProfile
 * @param {array} statementsSets
 */
function updateCompanyProfile(
  companyProfile,
  statementsSets: { [key: string]: string[] }[]
) {
  const colNamesRows = statementsSets.map(set => set.colNames.slice(1));
  const sameColNames = areRowsIdentical(colNamesRows);
  if (!sameColNames) {
    console.error('No update, because colNames in rows are not identical.');
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
 * Search in a company profile corresponding fields and add values.
 * @param companyProfile
 * @param row
 * @param periods
 */
function addDataToCompanyProfile(
  companyProfile: object,
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
      statements[year] = getStatementsTemplate(year);
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
      'grossProfit',
      'ebitda',
      'ebitdaMargin',
    ];
    const financial = financialsNames.includes(name) && name;
    const statement = asset
      ? statements[year].assets[asset]
      : financial
      ? statements[year].financials[name]
      : statements[year][name];

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
 *
 * @param {string} str
 */
function strToNum(str: string): string | number {
  return str.includes('%') ? str : Number(str.split(' ').join(''));
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

interface ParsedTimePeriod {
  year: number;
  quarter?: number;
}

export default updateCompanyProfile;
