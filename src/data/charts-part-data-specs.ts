import {
  statementsKeys,
  OneChartTranslations,
  getChartTranslationsFor,
} from '../translations/charts-translations';

// TODO: move to zecoConfig
const defaultColor = 'blue';

const chartsColors = {
  netProfit: 'steelblue',
  profitGrowth: 'steelblue',
  grossProfit: 'steelblue',
  netLoss: 'indianred',
  grossLoss: 'indianred',
  netIncome: 'cadetblue',
  incomeGrowth: 'cadetblue',
  'assets.current': '#dca45a',
  'assets.fixed': '#dca45a',
  'assets.totalValue': '#dca45a',
  equity: '#e4929e',
  producedCost: '#e4929e',
  salaryExpenses: '#e4929e',
  ebitda: '#b167f5',
  ebitdaMargin: '#b167f5',
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
