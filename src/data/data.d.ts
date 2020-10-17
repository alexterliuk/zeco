interface CompanyProfile {
  id: string;
  name: string;
  shortName: string;
  EDRPOU: string;
  location: string;
  financials: {
    [key: number]: Financials;
  };
}

interface FinancialResult {
  quarters: number[];
  year: number;
}

interface Financials {
  netProfit: FinancialResult;
  netProfitMargin: FinancialResult;
  ebitda: FinancialResult;
  ebitdaMargin: FinancialResult;
  netRevenue: FinancialResult;
  revenueGrowth: FinancialResult;
  profitGrowth: FinancialResult;
}
