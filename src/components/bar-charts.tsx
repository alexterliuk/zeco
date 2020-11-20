import React, { useState } from 'react';
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

const BarCharts = ({
  initChartSpec,
  chartsSpecs = [],
  rigidSize = false,
}: {
  initChartSpec: ChartSpec;
  chartsSpecs?: ChartSpec[];
  rigidSize?: boolean;
}) => {
  const [chart, updateChart] = useState(
    getBarChart(initChartSpec.data, initChartSpec.config, rigidSize)
  );
  const [title, updateTitle] = useState(initChartSpec.title);
  const [buttonsClasses, updateButtonsClasses] = useState({
    [initChartSpec.btnName]: 'active',
  });
  const allChartsSpecs = [initChartSpec, ...chartsSpecs];
  const specs = allChartsSpecs.reduce(
    (acc: { [key: string]: ChartSpec }, s) => ((acc[s.btnName] = s), acc),
    {}
  );
  const handleClick = (name: string) => {
    const spec = specs[name];
    updateChart(getBarChart(spec.data, spec.config, rigidSize));
    updateTitle(spec.title);
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
      <h3>{title}</h3>
      {allChartsSpecs.length > 1 &&
        allChartsSpecs.map(s => (
          <Button
            key={s.btnName}
            onClick={() => handleClick(s.btnName)}
            className={buttonsClasses[s.btnName]}
          >
            {s.btnName}
          </Button>
        ))}
      {chart}
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

interface ChartSpec {
  title: string;
  btnName: string;
  data: { name: string }[];
  config: ChartConfig;
}

interface ChartConfig {
  barsConfig: { dataKey: string; unit: string; color: string }[];
  width?: number;
  height?: number;
  gridDashes?: string;
}

export { BarCharts };
