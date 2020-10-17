import turboatom from './turboatom';
import naftogaz from './naftogaz';
import ukrenergo from './ukrenergo';

const companies: Companies = {
  turboatom,
  naftogaz,
  ukrenergo,
};

const _ids: CompaniesIds[] = Object.keys(companies);
type CompaniesIds = keyof typeof companies;

export default { _ids, ...companies };
