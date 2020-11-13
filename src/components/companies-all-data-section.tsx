import React from 'react';
import styled from 'styled-components';
import { companiesIds } from '../data/companies';
import CompanyAllDataRow from './company-all-data-row';

const Container = styled.section`
  padding: 20px 30px;
  min-height: 300px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  /*background: #efefef;*/
  margin-top: 2.5rem;
`;

const CompaniesAllDataSection = () => {
  const companiesRows = companiesIds.map(id => (
    <CompanyAllDataRow key={id} id={id} />
  ));

  return <Container>{companiesRows}</Container>;
};

export default CompaniesAllDataSection;
