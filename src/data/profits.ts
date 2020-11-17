const profits: Profit[] = [
  {
    key: 'loss',
    timePeriod: { year: 2020, quarter: 1 },
    value: -27032310,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019, quarter: 1 },
    value: 4283110,
  },
  {
    key: 'loss',
    timePeriod: { year: 2020, quarter: 0 },
    value: -13075071,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019, quarter: 0 },
    value: 5123905,
  },
  {
    key: 'profit',
    timePeriod: { year: 2019 },
    value: 1007565,
  },
  {
    key: 'profit',
    timePeriod: { year: 2018 },
    value: 41339230,
  },
  {
    key: 'profit',
    timePeriod: { year: 2017 },
    value: 44780705,
  },
  {
    key: 'profit',
    timePeriod: { year: 2016 },
    value: 35880517,
  },
];

export interface Profit {
  key: 'profit' | 'loss';
  timePeriod: { year: number; quarter?: 0 | 1 | 2 };
  value: number;
}

export default profits;
