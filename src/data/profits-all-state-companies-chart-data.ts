import { translateChart } from '../translations/translate';
import { Languages } from '../translations/translations';
import { ChartSpec } from '../components/bar-charts';

const profitsAllStateCompaniesChartData = {
  title: 'Profits/losses of all state-owned companies of Ukraine',
  btnName: 'All companies profits',
  data: [
    // { name: '2016-1', profit: 5.581 },
    // { name: '2016-2', profit: 50.883 },
    // { name: '2016-3', profit: 3.56 },
    { name: '2016', profit: 35.881 },
    // { name: '2017-1', profit: 22.642 },
    // { name: '2017-2', profit: 35.977 },
    // { name: '2017-3', profit: 1.723 },
    { name: '2017', profit: 44.781 },
    // { name: '2018-1', profit: 16.892 },
    // { name: '2018-2', profit: 24.003 },
    // { name: '2018-3', profit: 16.034 },
    { name: '2018', profit: 41.339 },
    // { name: '2019-1', profit: 5.124 },
    // { name: '2019-2', profit: 4.266 },
    // { name: '2019-3', profit: 3.018 },
    { name: '2019', profit: 1.224 },
    { name: '2020-1', loss: -13.076 },
    { name: '2020-2', loss: -27.032 },
  ],
  config: {
    barsConfig: [
      { dataKey: 'profit', unit: ' bln uah', color: '#0c920c' },
      { dataKey: 'loss', unit: ' bln uah', color: 'red' },
    ],
  },
  translate,
};

const chartTranslations = {
  en: profitsAllStateCompaniesChartData,
  uk: {
    title: 'Прибутки/збитки всіх державних компаній України',
    btnName: 'Прибутки всіх компаній',
    data: [
      { name: '2016', Прибуток: 35.881 },
      { name: '2017', Прибуток: 44.781 },
      { name: '2018', Прибуток: 41.339 },
      { name: '2019', Прибуток: 1.224 },
      { name: '2020-1', Збиток: -13.076 },
      { name: '2020-2', Збиток: -27.032 },
    ],
    config: {
      barsConfig: [
        { dataKey: 'Прибуток', unit: ' млрд грн', color: '#0c920c' },
        { dataKey: 'Збиток', unit: ' млрд грн', color: 'red' },
      ],
    },
    translate,
  },
};

function translate(
  translateOneItem: string | undefined,
  lang: Languages | undefined
): ChartSpec | string {
  return translateChart(
    profitsAllStateCompaniesChartData,
    chartTranslations,
    translateOneItem,
    lang
  );
}

export default profitsAllStateCompaniesChartData;
