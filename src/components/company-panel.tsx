import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import deBangAndMemo from '../helpers/de-bang-and-memo';
import getKeyValCollection from '../helpers/get-key-val-collection';
import CompanyInfoItem from './company-info-item';
import {
  KeyValuePair,
  KeyValuePairs,
} from '../helpers/extract-key-value-pairs';
import { ParsedTimePeriod } from '../data/update-company-profile';
import { TranslationsType } from '../translations/translations';
import { translate, translateCommon } from '../translations/translate';
import { Link } from 'gatsby';

const Panel = styled.div`
  max-width: 400px;
  padding: 20px 30px;
  min-height: 300px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  transition: opacity 200ms;
  will-change: opacity;
`;

const CompanyPanel = ({
  companyData = [],
  companyPanelOpacity,
  timePeriod,
}: CompanyPanelProps) => {
  if (!Array.isArray(companyData) || !companyData.length) return null;
  // rec stands for record
  const id = companyData.filter(rec => rec.key === 'id')[0].value;
  const usreou = companyData.filter(rec => rec.key === 'usreou')[0].value;
  const { year, quarter } = timePeriod;
  const translateConfig: { id: string; type: TranslationsType } = {
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
  const finInfoSplitPaths = zecoConfig.getItem([
    'showInCompanyPanel',
    'finInfoSplitPaths',
  ]);

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
  const finInfoToShow = getKeyValCollection(
    statements[year],
    finInfo.arr,
    finInfoSplitPaths,
    // @ts-ignore
    { quarter }
  );

  const finItems = finInfoToShow.map((rec: KeyValuePair, i: number) => {
    if (
      rec.value !== false &&
      rec.value !== undefined &&
      rec.value !== '-100.0%'
    ) {
      return (
        <CompanyInfoItem
          key={rec.key}
          translateConfig={translateConfig}
          // @ts-ignore
          name={finInfo.startsWithBang[rec.key] ? '' : rec.key}
          value={rec.value}
          // pos={finInfo.arr.findIndex((f: string) => f === rec.key)}
          pos={i}
        />
      );
    }
  });
  // finItems.sort(
  //   (a: ReactElement, b: ReactElement) => a.props.pos - b.props.pos
  // );

  return (
    <Panel style={{ opacity: companyPanelOpacity }}>
      <h3>{translate(id, 'companies', 'shortName')}</h3>
      {regItems}
      {finItems}
      <Link to={`/companies-and-charts?${usreou}`}>
        {translateCommon('showMore')}
      </Link>
    </Panel>
  );
};

CompanyPanel.propTypes = {
  companyData: PropTypes.array,
  companyPanelOpacity: PropTypes.number,
  timePeriod: PropTypes.object,
};

interface CompanyPanelProps {
  companyData: KeyValuePairs;
  companyPanelOpacity: number;
  timePeriod: ParsedTimePeriod;
}

export default CompanyPanel;
