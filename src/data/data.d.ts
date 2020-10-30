export interface CompanyProfile {
  id: string;
  name: string;
  shortName: string;
  usreou: number | string;
  location: string;
  industry: string;
  statements: {
    [key: number]: FinancialStatements;
  };
}

export interface FinancialStatements {
  assets: {
    current: FinancialStatement;
    fixed: FinancialStatement;
    totalValue: FinancialStatement;
  };
  equity: FinancialStatement;
  producedCost: FinancialStatement;
  salaryExpenses: FinancialStatement;
  financials: {
    netProfit: FinancialStatement;
    netLoss: FinancialStatement;
    grossProfit: FinancialStatement;
    grossLoss: FinancialStatement;
    netIncome: FinancialStatement;
    profitGrowth: FinancialStatement;
    incomeGrowth: FinancialStatement;
    ebitda: FinancialStatement;
    ebitdaMargin: FinancialStatement;
  };
}

export interface FinancialStatement {
  quarters: number[];
  halfyear: number[];
  year: number | false;
}

//
// interface Companies {
//   [key: string]: CompanyProfile;
// }
