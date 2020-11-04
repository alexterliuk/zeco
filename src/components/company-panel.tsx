import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import deBangAndMemo from '../helpers/de-bang-and-memo';
import pickData from '../helpers/pick-data';
import CompanyInfoItem from './company-info-item';
import {
  KeyValuePair,
  KeyValuePairs,
} from '../helpers/extract-key-value-pairs';
import { TranslationsTypes } from '../translations/translations';
import translate from '../translations/translate';

const companyPanelPropTypes = {
  companyData: PropTypes.array,
  companyPanelOpacity: PropTypes.number,
};

const Panel = styled.div`
  max-width: 400px;
  padding: 20px 30px;
  height: 300px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  /*background: #efefef;*/
  margin-top: 2.5rem;
  transition: opacity 200ms;
  will-change: opacity;
`;

const CompanyPanel = ({
  companyData = [],
  companyPanelOpacity,
}: CompanyPanelProps) => {
  if (!Array.isArray(companyData) || !companyData.length) return null;
  // rec stands for record
  const id = companyData.filter(rec => rec.key === 'id')[0].value;
  const quarter = zecoConfig.getItem(['statements', 'quarter']);
  const year = zecoConfig.getItem(['statements', 'year']);
  const translateConfig: { id: string; type: TranslationsTypes } = {
    id,
    type: 'companyKeys',
  };
  const { regInfo } = deBangAndMemo(
    zecoConfig.getItem(['showInCompanyPanel', 'regInfo']),
    'regInfo'
  );
  const { finInfo } = deBangAndMemo(
    zecoConfig.getItem(['showInCompanyPanel', 'finInfo']),
    'finInfo'
  );

  // TODO: add logic for displaying млрд грн?

  const regInfoToShow = companyData.filter(rec =>
    regInfo.arr.includes(rec.key)
  );

  const regItems = regInfoToShow.map((rec: KeyValuePair) => (
    <CompanyInfoItem
      key={rec.key}
      translateConfig={translateConfig}
      // @ts-ignore
      name={regInfo.startsWithBang[rec.key] ? '' : rec.key}
      value={rec.value}
    />
  ));

  const statements = companyData.filter(r => r.key === 'statements')[0].value;
  const finInfoToShow = (statements[year] || []).filter((rec: KeyValuePair) =>
    finInfo.arr.includes(rec.key)
  );

  for (const categoryName of ['financials', 'assets']) {
    const category = statements[year].find(
      (rec: KeyValuePair) => rec.key === categoryName
    ).value;
    for (const item of finInfo.arr) {
      const pathSegments = item.split('.').slice(1); // e.g. item 'assets.fixed'
      const pickedValue = pickData(category, pathSegments);
      const value = pickedValue || category[item];
      if (value) finInfoToShow.push({ key: item, value });
    }
  }

  const finItems = finInfoToShow.map((rec: KeyValuePair) => (
    <CompanyInfoItem
      key={rec.key}
      translateConfig={translateConfig}
      // @ts-ignore
      name={finInfo.startsWithBang[rec.key] ? '' : rec.key}
      value={
        quarter === undefined ? rec.value.year : rec.value.quarters[quarter]
      }
      pos={finInfo.arr.findIndex((f: string) => f === rec.key)}
    />
  ));
  finItems.sort(
    (a: ReactElement, b: ReactElement) => a.props.pos - b.props.pos
  );

  return (
    <Panel style={{ opacity: companyPanelOpacity }}>
      <h3>{translate(id, 'companies', 'shortName')}</h3>
      {regItems}
      {finItems}
    </Panel>
  );
};

CompanyPanel.propTypes = companyPanelPropTypes;

type CompanyPanelProps = {
  companyData: KeyValuePairs;
  companyPanelOpacity: number;
};

export default CompanyPanel;
