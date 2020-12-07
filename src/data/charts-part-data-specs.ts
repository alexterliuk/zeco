import {
  statementsKeys,
  OneChartTranslations,
  getChartTranslationsFor,
} from '../translations/charts-translations';

// TODO: move to zecoConfig
const defaultColor = 'blue';

const chartsColors = {
  netProfit: '',
  profitGrowth: '',
  netIncome: '',
  incomeGrowth: '',
  netLoss: 'red',
  equity: '',
  'assets.current': '',
  'assets.fixed': '',
  'assets.totalValue': '',
  producedCost: '',
  salaryExpenses: '',
  grossProfit: '',
  grossLoss: 'red',
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
      translations: getChartTranslationsFor(key),
    };
    return acc;
  },
  {}
);

export default chartsPartDataSpecs;
