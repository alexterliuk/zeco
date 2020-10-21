import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import deBangAndMemo from '../helpers/de-bang-and-memo';
import CompanyInfoItem from './company-info-item';
import {
  KeyValuePair,
  KeyValuePairs,
} from '../helpers/extract-key-value-pairs';

const companyPanelPropTypes = {
  companyData: PropTypes.array,
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
`;

// TODO: add translations.ts

const CompanyPanel = ({ companyData = [] }: CompanyPanelProps) => {
  const quarter = zecoConfig.getItem(['financials', 'quarter']);
  const year = zecoConfig.getItem(['financials', 'year']);

  const { regInfo } = deBangAndMemo(
    zecoConfig.getItem(['showInCompanyPanel', 'regInfo']),
    'regInfo'
  );
  const { finInfo } = deBangAndMemo(
    zecoConfig.getItem(['showInCompanyPanel', 'finInfo']),
    'finInfo'
  );

  // rec stands for record
  const nameRec = companyData.filter(rec => rec.key === 'name');
  const name = (nameRec[0] && nameRec[0].value) || '';

  // TODO: add logic for displaying млрд грн, percents etc.

  const regInfoToShow = companyData.filter(rec =>
    regInfo.arr.includes(rec.key)
  );
  const regItems = regInfoToShow.map((rec: KeyValuePair) => (
    <CompanyInfoItem
      key={rec.key}
      name={regInfo.startsWithBang[rec.key] ? '' : rec.key}
      value={rec.value}
    />
  ));

  let finInfoToShow = companyData.filter(rec => rec.key === 'financials');
  finInfoToShow = (
    finInfoToShow[0].value[year] || []
  ).filter((rec: KeyValuePair) => finInfo.arr.includes(rec.key));
  const finItems = finInfoToShow.map((rec: KeyValuePair) => (
    <CompanyInfoItem
      key={rec.key}
      name={finInfo.startsWithBang[rec.key] ? '' : rec.key}
      value={quarter === undefined ? rec.value.year : rec.value.quarters[quarter]}
      pos={finInfo.arr.findIndex((f: string) => f === rec.key)}
    />
  ));
  finItems.sort((a, b) => a.props.pos - b.props.pos);

  return (
    <Panel>
      <h3>{name}</h3>
      {regItems}
      {finItems}
    </Panel>
  );
};

CompanyPanel.propTypes = companyPanelPropTypes;

type CompanyPanelProps = {
  companyData: KeyValuePairs;
};

export default CompanyPanel;
