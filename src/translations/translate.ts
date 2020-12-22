import translations, {
  TranslationsType,
  TranslationsCommonKey,
  TranslationsCompanyKey,
  Language,
} from './translations';
import { ChartSpec } from '../components/bar-charts';
import useLangContext from '../hooks/use-lang-context';

const translate = (
  id: string,
  entityType: TranslationsType,
  companyKey?: TranslationsCompanyKey,
  commonKey?: TranslationsCommonKey
): string => {
  const { getLang } = useLangContext;
  let item;

  if (companyKey && entityType === 'companyKeys') {
    item = translations.companyKeys[companyKey];
  } else if (companyKey && entityType === 'companies') {
    const companies: any = translations.companies;
    item = companies[id]?.[companyKey];
  } else if (commonKey && entityType === 'common') {
    item = translations.common[commonKey];
  }

  return (item && (item[getLang()] || item.ua)) || '';
};

const translateCommon = (commonKey: TranslationsCommonKey): string =>
  (commonKey && translate('', 'common', undefined, commonKey)) || '';

const translateCompanyKey = (companyKey: TranslationsCompanyKey): string =>
  (companyKey && translate('', 'companyKeys', companyKey)) || '';

const translateTimePeriod = (val: string): string => {
  if (val.match(/^[1-3]q$/)) {
    return `${val[0]} ${translate('', 'common', undefined, 'qrDot')}`;
  }
  return val;
};

const translateChart = (
  chartSpecTranslations: ChartSpecTranslations,
  translateOneItem?: string | undefined,
  lang?: Language
) => {
  const _lang: Language = lang || useLangContext.getLang();
  const key = translateOneItem;
  if (typeof key === 'string') {
    return key === 'title' || key === 'btnName'
      ? chartSpecTranslations[_lang][key]
      : key;
  }

  return chartSpecTranslations[_lang];
};

export interface ChartSpecTranslations {
  en: ChartSpec;
  ua: ChartSpec;
}

export {
  translate,
  translateCommon,
  translateCompanyKey,
  translateTimePeriod,
  translateChart,
};
