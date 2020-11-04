const translations = {
  companyKeys: {
    name: {
      uk: 'Назва',
      en: 'Name',
    },
    shortName: {
      uk: 'Скорочена назва',
      en: 'Short name',
    },
    location: {
      uk: 'Місцезнаходження',
      en: 'Location',
    },
    industry: {
      uk: 'Галузь',
      en: 'Industry',
    },
    assets: {
      uk: 'Активи',
      en: 'Assets',
    },
    'assets.current': {
      uk: 'Оборотні активи',
      en: 'Current assets',
    },
    'assets.fixed': {
      uk: 'Основні засоби',
      en: 'Fixed assets',
    },
    'assets.totalValue': {
      uk: 'Загальні активи',
      en: 'Total value of assets',
    },
    equity: {
      uk: 'Власний капітал',
      en: 'Equity',
    },
    producedCost: {
      uk: 'Собівартість продукції',
      en: 'Produced cost',
    },
    salaryExpenses: {
      uk: 'Витрати на зарплату',
      en: 'Salary expenses',
    },
    financials: {
      uk: 'Фінпоказники',
      en: 'Financials',
    },
    netProfit: {
      uk: 'Чистий прибуток',
      en: 'Net profit',
    },
    netLoss: {
      uk: 'Чистий збиток',
      en: 'Net loss',
    },
    grossProfit: {
      uk: 'Валовий прибуток',
      en: 'Gross profit',
    },
    grossLoss: {
      uk: 'Валовий збиток',
      en: 'Gross loss',
    },
    netIncome: {
      uk: 'Чистий дохід',
      en: 'Net income',
    },
    profitGrowth: {
      uk: 'Зростання прибутку',
      en: 'Profit growth',
    },
    incomeGrowth: {
      uk: 'Зростання доходу',
      en: 'Income growth',
    },
    ebitda: {
      uk: 'EBITDA',
      en: 'EBITDA',
    },
    ebitdaMargin: {
      uk: 'Рентабельність EBITDA',
      en: 'EBITDA margin',
    },
  },
};

export default translations;

export type Translations = keyof typeof translations;
export type TranslationsItem = {
  uk: string;
  en: string;
};
export type TranslationsTypes = 'companyKeys';
export type TranslationsCompanyKeys = keyof typeof translations.companyKeys;
export type TranslationsCompany = {
  [key in TranslationsCompanyKeys]: TranslationsItem;
};
export type Languages = 'uk' | 'en';
