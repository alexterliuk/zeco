import {
  CompanyAllDataPanelProps,
  CompanyAllDataTableRow,
} from '../components/company-all-data-panel';
import { languages, Language } from '../translations/translations';
import chartsPartDataSpecs from '../data/charts-part-data-specs';
import { ChartSpec } from '../components/bar-charts';
import { OneChartTranslations } from '../translations/charts-translations';
import {
  ChartSpecTranslations,
  translateChart,
} from '../translations/translate';

const getChartsData = (
  propsOfComposedCompanyAllDataPanel: CompanyAllDataPanelProps
) => {
  const { theadRow, tbodyRows } = propsOfComposedCompanyAllDataPanel;
  return makeChartsSpecs(theadRow, tbodyRows);
};

function makeChartsSpecs(
  theadRow: CompanyAllDataPanelProps['theadRow'],
  tbodyRows: CompanyAllDataPanelProps['tbodyRows']
) {
  return tbodyRows.map(row => {
    const name = row.name;
    const chartSpecTranslations = languages.reduce(
      (acc: { [key: string /* Language */]: ChartSpec }, lang) => {
        acc[lang] = makeChartSpec(
          (acc as unknown) as ChartSpecTranslations,
          theadRow,
          row,
          chartsPartDataSpecs[name],
          lang
        );
        return acc;
      },
      {}
    );
    return { [row.name]: chartSpecTranslations };
  });
}

function makeChartSpec(
  chartSpecTranslations: ChartSpecTranslations,
  theadRow: CompanyAllDataPanelProps['theadRow'],
  tbodyRow: CompanyAllDataTableRow,
  spec: { color: string; translations: OneChartTranslations },
  lang: Language
) {
  const specTrs = spec.translations;

  return {
    title: specTrs.title[lang],
    btnName: specTrs.btnName[lang],
    data: tbodyRow.cells.map((cellVal, i) => ({
      name: theadRow.cells[i],
      [specTrs.dataKey[lang]]: cellVal,
    })),
    config: {
      barsConfig: [
        {
          dataKey: specTrs.dataKey[lang],
          unit: specTrs.unit[lang],
          color: chartsPartDataSpecs[tbodyRow.name].color,
        },
      ],
    },
    translate: (
      translateOneItem: string | undefined,
      lang: Language | undefined
    ): ChartSpec | string =>
      translateChart(chartSpecTranslations, translateOneItem, lang),
  };
}

export default getChartsData;
