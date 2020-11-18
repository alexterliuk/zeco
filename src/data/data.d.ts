export interface CompanyProfile {
  id: string;
  name: string;
  shortName: string;
  usreou: number | string;
  location: string;
  industry: string;
  statements: {
    [key: string]: FinancialStatements;
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
  quarters: (number | string | false)[];
  year: number | string | false;
}

interface Companies {
  [key: string]: CompanyProfile;
}
