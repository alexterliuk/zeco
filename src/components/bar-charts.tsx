import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { Button } from './styled-elements';
import zecoConfig from '../../config/zeco-config';
import { Language } from '../translations/translations';

// const translateChartItems = (
//   itemKey: string,
//   spec: ChartSpec,
//   specs: ChartSpec[] = []
// ) => {
//   return [spec, ...specs].reduce(
//     (acc: { [key: string]: string }, s) => (
//       (acc[s.btnName] = s.translate(itemKey) as string), acc
//     ),
//     {}
//   );
// };

const translateTitle = (shownChart: ChartSpec) => {
  return shownChart.translate('title', zecoConfig.getItem(['lang']));
};

const translateButtonName = (spec: ChartSpec) => {
  // second arg is absent compared to translateTitle because
  // translateButtonName is called from the loop and correct
  // current language is used (when standalone call, lang might be stale)
  return spec.translate('btnName');
};

const translateShownChart = (shownChart: ChartSpec, rigidSize: boolean) =>
  (s => getBarChart(s.data, s.config, rigidSize))(
    shownChart.translate(undefined, zecoConfig.getItem(['lang'])) as ChartSpec
  );

const BarCharts = ({
  initChartSpec,
  chartsSpecs = [],
  rigidSize = false,
}: {
  initChartSpec: ChartSpec;
  chartsSpecs?: ChartSpec[];
  rigidSize?: boolean;
}) => {
  // in different places spec.btnName serves as id of the chartData
  const [shownChart, replaceShownChart] = useState(initChartSpec);
  const [buttonsClasses, updateButtonsClasses] = useState({
    [initChartSpec.btnName]: 'active',
  });

  const allChartsSpecs = [initChartSpec, ...chartsSpecs];
  const specs = allChartsSpecs.reduce(
    (acc: { [key: string]: ChartSpec }, s) => ((acc[s.btnName] = s), acc),
    {}
  );

  const updateWhenNewSpec = useMemo(() => {
    // if BarCharts includes a few charts, find what one is shown
    const shownChartIdx = (ent =>
      // if ent has only one chart, buttonsClasses is init value of useState
      // i.e. only one chart exists, or more exist but no button was clicked -
      // thus the first chart is shown
      ent.length === 1 ? 0 : ent.findIndex(ent => ent[1] === 'active'))(
      Object.entries(buttonsClasses)
    );
    replaceShownChart(allChartsSpecs[shownChartIdx]);
  }, [initChartSpec]);

  const handleClick = (name: string) => {
    replaceShownChart(specs[name]);
    updateButtonsClasses(
      allChartsSpecs.reduce(
        (acc: { [key: string]: string }, s) => (
          (acc[s.btnName] = s.btnName === name ? 'active' : ''), acc
        ),
        {}
      )
    );
  };

  return (
    <>
      <h3>{translateTitle(shownChart)}</h3>
      {allChartsSpecs.length > 1 &&
        allChartsSpecs.map(s => (
          <Button
            key={s.btnName}
            onClick={() => handleClick(s.btnName)}
            className={buttonsClasses[s.btnName]}
          >
            {translateButtonName(s)}
          </Button>
        ))}
      {translateShownChart(shownChart, rigidSize)}
    </>
  );
};

/**
 * @param {array} data - with objects
 * @param {object} config
 * @param {boolean} [rigidSize]
 */
const getBarChart = (
  data: { name: string }[],
  config: ChartConfig,
  rigidSize?: boolean
) => {
  const { width = 762, height = 400, gridDashes = '3 3', barsConfig } = config;
  const chart = (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray={gridDashes} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {barsConfig.map(c => (
        <Bar key={c.dataKey} dataKey={c.dataKey} unit={c.unit} fill={c.color} />
      ))}
    </BarChart>
  );

  return (
    <div className="line-chart-wrapper" style={{ width: '100%', height }}>
      {rigidSize ? chart : <ResponsiveContainer>{chart}</ResponsiveContainer>}
    </div>
  );
};

BarCharts.propTypes = {
  initChartSpec: PropTypes.object,
  chartsSpecs: PropTypes.arrayOf(PropTypes.object),
  rigidSize: PropTypes.bool,
};

export interface ChartSpec {
  title: string;
  btnName: string;
  data: { name: string; [key: string]: any }[];
  config: ChartConfig;
  translate: (translateOneItem?: string, lang?: Language) => ChartSpec | string;
}

export interface ChartConfig {
  barsConfig: { dataKey: string; unit: string; color: string }[];
  width?: number;
  height?: number;
  gridDashes?: string;
}

export { BarCharts };
