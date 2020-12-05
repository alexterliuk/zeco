import zecoConfig from '../../config/zeco-config';
import translations, {
  TranslationsType,
  TranslationsCommonKey,
  TranslationsCompanyKey,
  Language,
} from './translations';
import { ChartSpec } from '../components/bar-charts';

const translate = (
  id: string,
  entityType: TranslationsType,
  companyKey?: TranslationsCompanyKey,
  commonKey?: TranslationsCommonKey
): string => {
  const lang: Language = zecoConfig.getItem(['lang']);
  let item;

  if (companyKey && entityType === 'companyKeys') {
    item = translations.companyKeys[companyKey];
  } else if (companyKey && entityType === 'companies') {
    const companies: any = translations.companies;
    item = companies[id]?.[companyKey];
  } else if (commonKey && entityType === 'common') {
    item = translations.common[commonKey];
  }

  return (item && (item[lang] || item.uk)) || '';
};

const translateCommon = (commonKey: TranslationsCommonKey): string =>
  (commonKey && translate('', 'common', undefined, commonKey)) || '';

const translateTimePeriod = (val: string): string => {
  if (val.match(/^[1-3]q$/)) {
    return `${val[0]} ${translate('', 'common', undefined, 'qrDot')}`;
  }
  return val;
};

const translateChart = (
  chartData: ChartSpec,
  chartTranslations: ChartTranslations,
  translateOneItem?: string | undefined,
  lang?: Language
) => {
  let _lang: Language = lang || zecoConfig.getItem(['lang']);
  const key = translateOneItem;
  if (typeof key === 'string') {
    return key === 'title' || key === 'btnName'
      ? chartTranslations[_lang][key]
      : key;
  }

  return chartTranslations[_lang];
};

interface ChartTranslations {
  en: ChartSpec;
  uk: ChartSpec;
}

export { translate, translateCommon, translateTimePeriod, translateChart };
