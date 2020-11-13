import companies from '../data/companies';
import { Companies } from '../data/data';
import extractKeyValuePairs, { KeyValuePairs } from './extract-key-value-pairs';
import wrapInMemoContext from './wrap-in-memo-context';

/**
 * @param {string} id
 */
function getCompanyData(id: string) {
  return _getCompanyData(id, companies);
}

/**
 * @param {string} id
 * @param {object} companies
 */
let _getCompanyData = (id: string, companies: Companies): KeyValuePairs => {
  return composeCompanyData(id, companies);
};
// furnish _getCompanyData with memoization capabilities
_getCompanyData = wrapInMemoContext(_getCompanyData);

/**
 * @param {string} id
 * @param {object} companies
 */
function composeCompanyData(id: string, companies: Companies): KeyValuePairs {
  const company = companies[id];
  if (!company) return [];

  const regularData = extractKeyValuePairs(company, ['statements']);

  const years = Object.keys(company.statements);
  const financeData = years.reduce(
    (acc: { [key: string]: KeyValuePairs }, y) => {
      acc[y] = extractKeyValuePairs(company.statements[+y]);
      return acc;
    },
    {}
  );

  return regularData.concat({
    key: 'statements',
    value: financeData,
  });
}

export default getCompanyData;
