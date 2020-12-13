import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import {
  CompanyId,
  Language,
  TranslationsCompanyKey,
} from '../translations/translations';
import getCompanyAllDataPanel from './company-all-data-panel';
import getChartsData from '../helpers/get-charts-data';
import { BarCharts } from './bar-charts';
import {
  ChartSpecTranslations,
  translateCommon,
} from '../translations/translate';
import { translateCompanyKey } from '../translations/translate';

const Preamble = styled.p`
  display: flex;
`;

const Message = styled.span`
  margin-left: auto;
`;

const PanelWrapper = styled.div`
  margin-bottom: 1.45rem;
`;

const chartsSets = [
  ['netProfit', 'profitGrowth', 'grossProfit'],
  ['netLoss', 'grossLoss'],
  ['netIncome', 'incomeGrowth'],
  ['assets.totalValue', 'assets.current', 'assets.fixed'],
  ['equity', 'producedCost', 'salaryExpenses'],
  ['ebitda', 'ebitdaMargin'],
];

let prevCompanyId = '';

const CompanyAllDataAndCharts = ({
  companyId,
}: {
  companyId: CompanyId | string;
}) => {
  if (!companyId) return null;

  const [composedCompanyAllDataPanel, refreshData] = useState(
    getCompanyAllDataPanel(companyId)
  );
  const [dataTuple, refreshDataTuple] = useState([
    null,
    composedCompanyAllDataPanel,
  ]);

  if (prevCompanyId !== companyId) {
    prevCompanyId = companyId;
    refreshData(() => {
      const composedPanel = getCompanyAllDataPanel(companyId);
      refreshDataTuple(() => {
        return dataTuple[0] ? [null, composedPanel] : [composedPanel, null];
      });
      return composedPanel;
    });
  }

  const data = composedCompanyAllDataPanel?.props;
  const chartsData = useMemo(() => getChartsData(data), [data]);
  const charts = useMemo(() => {
    const _charts = ((keysPairs: [string, number][]) =>
      keysPairs.reduce(
        (acc: { [key: string]: ChartSpecTranslations }, keysPair) => {
          const [k1, k2] = [keysPair[0], keysPair[1]];
          acc[k1] = (chartsData[k2][k1] as unknown) as ChartSpecTranslations;
          return acc;
        },
        {}
      ))(
      chartsData.length ? Object.entries(data.statementsIndicesInTbodyRows) : []
    );

    const lang = getLang();
    // add to charts only not empty charts
    return chartsSets.reduce((sets: ChartSpecTranslations[][], set) => {
      const specs = set.reduce((acc: ChartSpecTranslations[], name) => {
        const spec = _charts[name];
        const trName = translateCompanyKey(name as TranslationsCompanyKey);
        const emptySpec = spec[lang].data.every(d => d[trName] === undefined);
        if (!emptySpec) acc.push(spec);
        return acc;
      }, []);
      if (specs.length) sets.push(specs);
      return sets;
    }, []);
  }, chartsData);

  return (
    <>
      <Preamble>
        <Message>{translateCommon('dataGivenInKHryvnias')}</Message>
      </Preamble>
      {dataTuple[0] ? <PanelWrapper>{dataTuple[0]}</PanelWrapper> : null}
      {dataTuple[1] ? <PanelWrapper>{dataTuple[1]}</PanelWrapper> : null}
      {charts.length
        ? charts.map((c, i) => (
            <BarCharts
              key={`chartsSet${i}`}
              initChartSpec={c[0][getLang()]}
              chartsSpecs={(c => c.map(spec => spec[getLang()]))(c.slice(1))}
            />
          ))
        : null}
    </>
  );
};

const getLang = () => zecoConfig.getItem(['lang']) as Language;

CompanyAllDataAndCharts.propTypes = {
  companyId: PropTypes.string,
};

export default CompanyAllDataAndCharts;
