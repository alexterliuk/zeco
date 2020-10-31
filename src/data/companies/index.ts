import turboatom from './turboatom';
import naftogaz from './naftogaz';
import ukrenergo from './ukrenergo';
import { Companies } from '../data';

const companies: Companies = {
  turboatom,
  naftogaz,
  ukrenergo,
};

const companiesIds: CompaniesIds[] = Object.keys(companies);
export type CompaniesIds = keyof typeof companies;

export default companies;
export { companiesIds };
