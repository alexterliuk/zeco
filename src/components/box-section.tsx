import React, { Dispatch, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from './box';
import companies, { companiesIds, CompaniesIds } from '../data/companies/index';

const Container = styled.section`
  border: 1px solid lightgrey;
  margin: 10px auto;
  padding: 5px;
  max-width: 762px;
`;

const BoxSection = ({ setCompanyId }: BoxSectionProps) => {
  const boxes = companiesIds.map((k: CompaniesIds) => {
    const company: CompanyProfile = companies[k];
    const { name, id } = company;
    const profit = company.financials[2020].netProfit.quarters[1] > 0;

    return (
      <Box
        name={name}
        profit={profit}
        handleClick={setCompanyId}
        id={id}
        key={id}
      />
    );
  });

  return <Container>{boxes}</Container>;
};

BoxSection.propTypes = {
  setCompanyId: PropTypes.func,
};

interface BoxSectionProps {
  setCompanyId: Dispatch<SetStateAction<string>>;
}

export default BoxSection;
