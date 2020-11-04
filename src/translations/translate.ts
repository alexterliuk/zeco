import zecoConfig from '../../config/zeco-config';
import translations, {
  TranslationsTypes,
  TranslationsCompanyKeys,
  Languages,
} from './translations';

function translate(
  id: string,
  entityType: TranslationsTypes,
  key: TranslationsCompanyKeys
): string {
  const lang: Languages = zecoConfig.getItem(['lang']);

  if (entityType === 'companyKeys') {
    const item = key && translations[entityType][key];
    return (item && item[lang]) || item.en;
  }

  return key;
}

export default translate;
