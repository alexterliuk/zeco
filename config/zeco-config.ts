import pickData from '../src/helpers/pick-data';
import { getStatementsTemplate } from '../src/data/build-company-profile';
import prependKeysToPathsIfNeeded from '../src/helpers/prepend-keys-to-paths-if-needed';

const zecoConfig: ZecoConfig = {
  lang: 'uk',
  statements: {
    year: 2020,
    quarter: 1, // 1st q. is 0, 2nd - 1 etc.
    format: {
      uah: [
        /*'netProfit', 'netIncome'*/
      ],
      percent: [
        // 'profitGrowth',
        // 'incomeGrowth',
        // 'ebitdaMargin',
      ],
      //gap1: ['netProfit', 'revenueGrowth', 'fsf'],
    },
  },
  showInCompanyPanel: {
    // name not added to regInfo, bec. it is always shown
    regInfo: [
      /*'!location'*/
    ], // ! - show only value but not key
    /*'financials.netProfit' also works*/
    finInfo: [
      'netProfit|netLoss',
      'profitGrowth',
      'netIncome',
      'incomeGrowth',
      'assets.totalValue',
    ],
  },
  showInCompanyAllDataPanel: {
    table: {
      cols: {
        years: ['2016', '2017', '2018', '2019', '2020'],
        quarters: false,
        currYearQuarters: true,
      },
      rows: [
        'netProfit',
        'profitGrowth',
        'netIncome',
        'incomeGrowth',
        'netLoss',
        'equity',
        // 'assets.current',
        // 'assets.fixed',
        'assets.totalValue',
        // 'producedCost',
        // 'salaryExpenses',
        // 'grossProfit',
        // 'grossLoss',
        // 'ebitda',
        // 'ebitdaMargin',
      ],
    },
  },
};

const getItem = (pathSegments: string[] = []): any => {
  const item = pickData(zecoConfig, pathSegments);
  return typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item;
};

const updateItem = (pathSegments: string[] = [], value: any): void => {
  if (value === undefined) return;
  const lastPathSegm = pathSegments[pathSegments.length - 1];
  const configItem =
    pathSegments.length === 1
      ? zecoConfig
      : pickData(zecoConfig, pathSegments.slice(0, -1));

  // TODO: add check whether new value type === orig value type
  //       to avoid assigning not appropriate values

  if (
    typeof configItem === 'object' &&
    configItem.hasOwnProperty(lastPathSegm)
  ) {
    configItem[lastPathSegm] = value;
  }
};

const addItem = (pathSegments: string[], item: any): void => {
  const data = pickData(zecoConfig, pathSegments);
  if (data === undefined) {
    const lastPathSegm = pathSegments[pathSegments.length - 1];
    const parent =
      pathSegments.length === 1
        ? zecoConfig
        : pickData(zecoConfig, pathSegments.slice(0, -1));

    if (typeof parent === 'object' && !Array.isArray(parent)) {
      parent[lastPathSegm] = item;
    }
  }
};

const addFinInfoSplitPaths = (finInfo: string[]): void => {
  if (!finInfo) return;
  const tpl = getStatementsTemplate();
  // @ts-ignore
  const tplKeys = Object.keys(tpl).filter(k => !tpl[k].quarters);
  const finInfoSplitPaths = prependKeysToPathsIfNeeded(finInfo, tpl, tplKeys);
  if (finInfoSplitPaths) {
    addItem(['showInCompanyPanel', 'finInfoSplitPaths'], finInfoSplitPaths);
  }
};
addFinInfoSplitPaths(zecoConfig?.showInCompanyPanel?.finInfo);

type ZecoConfig = {
  [key: string]: any;
};

export default { getItem, updateItem };
