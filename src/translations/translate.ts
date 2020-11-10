import zecoConfig from '../../config/zeco-config';
import translations, {
  TranslationsTypes,
  TranslationsCompanyKey,
  Languages,
} from './translations';
import { CompanyId } from '../data/companies';

function translate(
  id: CompanyId,
  entityType: TranslationsTypes,
  key: TranslationsCompanyKey
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
