// profits/losses of all state-owned companies of Ukraine
// data from prozvit.com.ua as of Nov 19, 2020
const profitsOfAllStateCompaniesOfUkr: Profit[] = [
  {
    key: 'loss',
    timePeriod: { year: 2020, quarter: 1 },
    value: -27032310,
  },
  {
    key: 'loss',
    timePeriod: { year: 2020, quarter: 0 },
    value: -13075704,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019 },
    value: 1223916,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019, quarter: 2 },
    value: 3017521,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019, quarter: 1 },
    value: 4266060,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019, quarter: 0 },
    value: 5123905,
  },
  {
    key: 'profit',
    timePeriod: { year: 2018 },
    value: 41339230,
  },
  {
    key: 'profit',
    timePeriod: { year: 2018, quarter: 2 },
    value: 16034171,
  },
  {
    key: 'profit',
    timePeriod: { year: 2018, quarter: 1 },
    value: 24002563,
  },
  {
    key: 'profit',
    timePeriod: { year: 2018, quarter: 0 },
    value: 16892489,
  },
  {
    key: 'profit',
    timePeriod: { year: 2017 },
    value: 44780705,
  },
  {
    key: 'profit',
    timePeriod: { year: 2017, quarter: 2 },
    value: 1723367,
  },
  {
    key: 'profit',
    timePeriod: { year: 2017, quarter: 1 },
    value: 35977332,
  },
  {
    key: 'profit',
    timePeriod: { year: 2017, quarter: 0 },
    value: 22641639,
  },
  {
    key: 'profit',
    timePeriod: { year: 2016 },
    value: 35880517,
  },
  {
    key: 'profit',
    timePeriod: { year: 2016, quarter: 2 },
    value: 3560215,
  },
  {
    key: 'profit',
    timePeriod: { year: 2016, quarter: 1 },
    value: 50883003,
  },
  {
    key: 'profit',
    timePeriod: { year: 2016, quarter: 0 },
    value: 5581221,
  },
];

const profitsIndicesSets = [
  [4, 0],
  [5, 1],
  [6, 2],
  [10, 6],
  [14, 10],
];

export interface Profit {
  key: 'profit' | 'loss';
  timePeriod: { year: number; quarter?: 0 | 1 | 2 };
  value: number;
}

export { profitsIndicesSets };
export default profitsOfAllStateCompaniesOfUkr;
