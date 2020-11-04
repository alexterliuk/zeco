import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CompanyPanel from './company-panel';
import companies from '../data/companies/index';
import { Companies } from '../data/data';
import extractKeyValuePairs, {
  KeyValuePairs,
} from '../helpers/extract-key-value-pairs';
import wrapInMemoContext from '../helpers/wrap-in-memo-context';

const Container = styled.section`
  /*background: #f9f8f8;*/
  margin-top: 2.5rem;
`;

const CompanyPanelSection = ({
  id,
  companyPanelOpacity,
}: CompanyPanelSectionProps) => {
  const companyData = getCompanyData(id, companies);

  return (
    <Container>
      <CompanyPanel
        companyData={companyData}
        companyPanelOpacity={companyPanelOpacity}
      />
    </Container>
  );
};

CompanyPanelSection.propTypes = {
  id: PropTypes.string,
  companyPanelOpacity: PropTypes.number,
};

interface CompanyPanelSectionProps {
  id: string;
  companyPanelOpacity: number;
}

/**
 *
 * @param {string} id
 * @param {object} companies
 */
let getCompanyData = (id: string, companies: Companies): KeyValuePairs => {
  return composeCompanyData(id, companies);
};
// furnish getCompanyData with memoization capabilities
getCompanyData = wrapInMemoContext(getCompanyData);

/**
 *
 * @param {string} id
 * @param {object} companies
 */
function composeCompanyData(id: string, companies: Companies): KeyValuePairs {
  const company = companies[id];
  if (!company) return [];

  const regularData = extractKeyValuePairs(company, ['statements']);

  const years = Object.keys(company.statements);
  const financeData = years.reduce(
    (acc: { [key: string]: KeyValuePairs }, y) => {
      acc[y] = extractKeyValuePairs(company.statements[+y]);
      return acc;
    },
    {}
  );

  return regularData.concat({
    key: 'statements',
    value: financeData,
  });
}

export default CompanyPanelSection;
