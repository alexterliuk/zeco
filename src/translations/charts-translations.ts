import translations, {
  languages,
  Language,
  TranslationsCompanyKey,
} from './translations';

const chartsTranslations = {};
// if there's need to use non default values for charts,
// add translations to chartsTranslations, e.g:
// const chartsTranslations = {
//   netProfit: {
//     title: {
//       uk: 'Динаміка чистого прибутку',
//       en: 'Changes in net profit',
//     },
//     btnName: {
//       uk: 'Чистий прибуток',
//       en: 'Net Profit',
//     },
//     dataKey: {
//       uk: 'Чистий Прибуток',
//       en: 'Net Profit',
//     },
//     unit: {
//       uk: ' млн грн',
//       en: ' m uah',
//     },
//   },
// };

// these are all keys to FinancialStatements in company.statements[year]
// e.g. in (../data/companies/ampu).statements['2016']
export const statementsKeys: Exclude<
  TranslationsCompanyKey,
  | 'name'
  | 'shortName'
  | 'location'
  | 'usreou'
  | 'industry'
  | 'assets'
  | 'financials'
>[] = [
  'netProfit',
  'profitGrowth',
  'netIncome',
  'incomeGrowth',
  'netLoss',
  'equity',
  'assets.current',
  'assets.fixed',
  'assets.totalValue',
  'producedCost',
  'salaryExpenses',
  'grossProfit',
  'grossLoss',
  'ebitda',
  'ebitdaMargin',
];

const statementsKeysTranslations = statementsKeys.reduce(
  (acc: { [k: string]: any }, key) => (
    (acc[key] = translations.companyKeys[key]), acc
  ),
  {}
);

export function getChartTranslationsFor(
  specName: ChartSpecName
): OneChartTranslations {
  const stKeysTrs = statementsKeysTranslations;
  const givenTrs: Partial<OneChartTranslations> = chartsTranslations[specName];

  const title =
    givenTrs?.title || stKeysTrs[specName] || makeTranslationItem(specName);
  const btnName = title;
  const dataKey = givenTrs?.dataKey || makeTranslationItem(specName);
  const unit = givenTrs?.unit || makeTranslationItem('');

  return { title, btnName, dataKey, unit };
}

function makeTranslationItem(str = '') {
  return languages.reduce(
    (acc, lang) => ((acc[lang] = str), acc),
    {} as ChartTranslationsItem
  );
}

export type ChartSpecName = keyof typeof chartsTranslations;
type ChartTranslationsItem = {
  [key in Language]: string;
};
export interface OneChartTranslations {
  title: ChartTranslationsItem;
  btnName: ChartTranslationsItem;
  dataKey: ChartTranslationsItem;
  unit: ChartTranslationsItem;
}

export default chartsTranslations;
