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

const updateZecoConfig = (pathSegments: string[] = [], value?: any): void => {
  if (value === undefined) return;

  let lastPathSegm = pathSegments[pathSegments.length - 1];
  let configOption = zecoConfig;
  let i = 0;

  while (configOption) {
    if (!pathSegments.hasOwnProperty(i) || i === pathSegments.length - 1) {
      break;
    }
    configOption = configOption[pathSegments[i++]];
  }

  // TODO: add check whether new value type === orig value type
  //       to avoid assigning not appropriate values

  if (
    typeof configOption === 'object' &&
    configOption.hasOwnProperty(lastPathSegm)
  ) {
    configOption[lastPathSegm] = value;
  }
};

type ZecoConfig = {
  [key: string]: any;
};

export { updateZecoConfig };
export default zecoConfig;
