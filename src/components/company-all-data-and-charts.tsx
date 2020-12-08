import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import { CompanyId, Language } from '../translations/translations';
import getCompanyAllDataPanel from './company-all-data-panel';
import getChartsData from '../helpers/get-charts-data';
import { BarCharts } from './bar-charts';
import {
  ChartSpecTranslations,
  translateCommon,
} from '../translations/translate';

const Preamble = styled.p`
  display: flex;
`;

const Message = styled.span`
  margin-left: auto;
`;

const PanelWrapper = styled.div`
  margin-bottom: 1.45rem;
`;

const CompanyAllDataAndCharts = ({
  companyId,
}: {
  companyId: CompanyId | string;
}) => {
  if (!companyId) return null;
  const composedCompanyAllDataPanel = getCompanyAllDataPanel(companyId);
  const data = composedCompanyAllDataPanel?.props;
  const chartsData = useMemo(() => getChartsData(data), [data]);
  const charts = useMemo(
    () =>
      ((keysPairs: [string, number][]) =>
        keysPairs.reduce(
          (acc: { [key: string]: ChartSpecTranslations }, keysPair) => {
            const [k1, k2] = [keysPair[0], keysPair[1]];
            acc[k1] = (chartsData[k2][k1] as unknown) as ChartSpecTranslations;
            return acc;
          },
          {}
        ))(
        chartsData.length
          ? Object.entries(data.statementsIndicesInTbodyRows)
          : []
      ),
    chartsData
  );

  return (
    <>
      <Preamble>
        <Message>{translateCommon('dataGivenInKHryvnias')}</Message>
      </Preamble>
      <PanelWrapper>{composedCompanyAllDataPanel}</PanelWrapper>
      {chartsData.length ? (
        <>
          <BarCharts
            initChartSpec={charts.netProfit[getLang()]}
            chartsSpecs={[
              charts.profitGrowth[getLang()],
              charts.grossProfit[getLang()],
            ]}
          />
          <BarCharts
            initChartSpec={charts.netLoss[getLang()]}
            chartsSpecs={[charts.grossLoss[getLang()]]}
          />
          <BarCharts
            initChartSpec={charts.netIncome[getLang()]}
            chartsSpecs={[charts.incomeGrowth[getLang()]]}
          />
          <BarCharts
            initChartSpec={charts['assets.totalValue'][getLang()]}
            chartsSpecs={[
              charts['assets.current'][getLang()],
              charts['assets.fixed'][getLang()],
            ]}
          />
          <BarCharts
            initChartSpec={charts.equity[getLang()]}
            chartsSpecs={[
              charts.producedCost[getLang()],
              charts.salaryExpenses[getLang()],
            ]}
          />
          {/*<BarCharts*/}
          {/*  initChartSpec={charts.ebitda[getLang()]}*/}
          {/*  chartsSpecs={[*/}
          {/*    charts.ebitdaMargin[getLang()],*/}
          {/*  ]}*/}
          {/*/>*/}
        </>
      ) : null}
    </>
  );
};

const getLang = () => zecoConfig.getItem(['lang']) as Language;

CompanyAllDataAndCharts.propTypes = {
  companyId: PropTypes.string,
};

export default CompanyAllDataAndCharts;
