import pickData from '../src/helpers/pick-data';

const zecoConfig: ZecoConfig = {
  lang: 'uk',
  financials: {
    year: 2020,
  },
  showInCompanyPanel: {
    // name not added to regInfo, bec. it is always shown
    regInfo: ['!location'], // ! - show only value but not key
    finInfo: ['netProfit', 'profitGrowth', 'netRevenue', 'revenueGrowth'],
  },
};

const getItem = (pathSegments: string[] = []): any => {
  const item = pickData(zecoConfig, pathSegments);
  return typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item;
};

const updateItem = (pathSegments: string[] = [], value?: any): void => {
  if (value === undefined) return;

  let lastPathSegm = pathSegments[pathSegments.length - 1];
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

type ZecoConfig = {
  [key: string]: any;
};

export default { getItem, updateItem };
