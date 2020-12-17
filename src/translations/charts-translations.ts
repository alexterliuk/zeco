import translations, {
  languages,
  Language,
  TranslationsCompanyKey,
} from './translations';

export const theadRowTranslations: {
  '1q': ChartTranslationsItem;
  '2q': ChartTranslationsItem;
  '3q': ChartTranslationsItem;
} = {
  '1q': { uk: '1к', en: '1q' },
  '2q': { uk: '2к', en: '2q' },
  '3q': { uk: '3к', en: '3q' },
};

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
  'grossProfit',
  'netLoss',
  'grossLoss',
  'netIncome',
  'incomeGrowth',
  'assets.current',
  'assets.fixed',
  'assets.totalValue',
  'equity',
  'producedCost',
  'salaryExpenses',
  'ebitda',
  'ebitdaMargin',
];

const unit = { uk: ' млн грн', en: ' m uah' };
const percent = { uk: '%', en: '%' };

const chartsTranslations: ChartSpecsPartialTranslations = {
  netProfit: { unit },
  profitGrowth: { unit: percent },
  grossProfit: { unit },
  netLoss: { unit },
  grossLoss: { unit },
  netIncome: { unit },
  incomeGrowth: { unit: percent },
  'assets.current': { unit },
  'assets.fixed': { unit },
  'assets.totalValue': { unit },
  equity: { unit },
  producedCost: { unit },
  salaryExpenses: { unit },
  ebitda: { unit },
  ebitdaMargin: { unit: percent },
};

// if there's need to use non default values for charts,
// below is an example of full translation for chartsTranslations:
// chartsTranslations.netProfit = {
//   title: {
//     uk: 'Динаміка чистого прибутку',
//     en: 'Changes in net profit',
//   },
//   btnName: {
//     uk: 'Чистий прибуток',
//     en: 'Net Profit',
//   },
//   dataKey: {
//     uk: 'Чистий Прибуток',
//     en: 'Net Profit',
//   },
//   unit: {
//     uk: ' млн грн',
//     en: ' m uah',
//   },
// };

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
  const dataKey = givenTrs?.dataKey || btnName;
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
export interface ChartSpecsPartialTranslations {
  netProfit: Partial<OneChartTranslations>;
  profitGrowth: Partial<OneChartTranslations>;
  grossProfit: Partial<OneChartTranslations>;
  netLoss: Partial<OneChartTranslations>;
  grossLoss: Partial<OneChartTranslations>;
  netIncome: Partial<OneChartTranslations>;
  incomeGrowth: Partial<OneChartTranslations>;
  'assets.current': Partial<OneChartTranslations>;
  'assets.fixed': Partial<OneChartTranslations>;
  'assets.totalValue': Partial<OneChartTranslations>;
  equity: Partial<OneChartTranslations>;
  producedCost: Partial<OneChartTranslations>;
  salaryExpenses: Partial<OneChartTranslations>;
  ebitda: Partial<OneChartTranslations>;
  ebitdaMargin: Partial<OneChartTranslations>;
}

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
