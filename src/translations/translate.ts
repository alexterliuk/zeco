import zecoConfig from '../../config/zeco-config';
import translations, {
  TranslationsTypes,
  TranslationsCompanyKeys,
  Languages,
} from './translations';
import { CompaniesIds } from '../data/companies';

function translate(
  id: CompaniesIds,
  entityType: TranslationsTypes,
  key: TranslationsCompanyKeys
): string {
  const lang: Languages = zecoConfig.getItem(['lang']);

  if (entityType === 'companyKeys') {
    const item = key && translations.companyKeys[key];
    return (item && item[lang]) || item.uk;
  }

  if (entityType === 'companies') {
    const companies: any = key && translations.companies;
    const item = (companies[id] || {})[key];
    return (item && item[lang]) || item.uk;
  }

  return key;
}

export default translate;
