import React, { Dispatch, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from './box';
import companies, { companiesIds, CompaniesIds } from '../data/companies/index';
import { CompanyProfile } from '../data/data';

const Container = styled.section`
  border: 1px solid lightgrey;
  margin: 10px auto;
  padding: 5px;
  max-width: 762px;
`;

const BoxSection = ({ updateCompanyPanel }: BoxSectionProps) => {
  const boxes = companiesIds.map((k: CompaniesIds) => {
    const company: CompanyProfile = companies[k];
    const { shortName, id } = company;
    const profit =
      company.statements[2020].financials.netProfit.quarters[1] > 0;

    return (
      <Box
        name={shortName}
        profit={profit}
        handleClick={updateCompanyPanel}
        id={id}
        key={id}
      />
    );
  });

  return <Container>{boxes}</Container>;
};

BoxSection.propTypes = {
  updateCompanyPanel: PropTypes.func,
};

interface BoxSectionProps {
  updateCompanyPanel: (id: string) => void;
}

export default BoxSection;
