import {
  statementsKeys,
  OneChartTranslations,
  getChartTranslationsFor,
  ChartSpecName,
} from '../translations/charts-translations';

// TODO: move to zecoConfig
const defaultColor = 'blue';

const chartsColors = {
  netProfit: 'cyan',
  profitGrowth: 'orange',
  netIncome: '',
  incomeGrowth: '',
  netLoss: '',
  equity: '',
  'assets.current': '',
  'assets.fixed': '',
  'assets.totalValue': '',
  producedCost: '',
  salaryExpenses: '',
  grossProfit: '',
  grossLoss: '',
  ebitda: '',
  ebitdaMargin: '',
};

const chartsPartDataSpecs = statementsKeys.reduce(
  (
    acc: { [k: string]: { color: string; translations: OneChartTranslations } },
    key
  ) => {
    acc[key] = {
      color: chartsColors[key] || defaultColor,
      // chartsTranslations might not have a key from statementsKeys
      // (if it's chosen to have default values for this key (i.e. for chart))
      // but let TS think the key exists, because an unknown key
      // is handled in getChartTranslationsFor; if remove 'as ChartSpecName',
      // chartsTranslations need to have {} for each key of statementsKey
      translations: getChartTranslationsFor(key as ChartSpecName),
    };
    return acc;
  },
  {}
);

export default chartsPartDataSpecs;
