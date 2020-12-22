import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from './box';
import companies, { companiesIds } from '../data/companies/index';
import { CompanyProfile } from '../data/data';
import { ParsedTimePeriod } from '../data/update-company-profile';

const Container = styled.section`
  border: 1px solid lightgrey;
  margin: 10px auto;
  padding: 5px;
  max-width: 762px;
`;

const BoxSection = ({ updateCompanyPanel, timePeriod }: BoxSectionProps) => {
  const boxes = companiesIds.map(k => {
    const company: CompanyProfile = companies[k];
    const { id } = company;
    const { year, quarter } = timePeriod;

    const netProfitObj = company.statements[year].financials.netProfit;
    const netProfitVal =
      quarter !== undefined
        ? netProfitObj.quarters[quarter]
        : netProfitObj.year;
    const profit = netProfitVal > 0;

    return (
      <Box
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
  timePeriod: PropTypes.object,
};

interface BoxSectionProps {
  updateCompanyPanel: (id: string) => void;
  timePeriod: ParsedTimePeriod;
}

export default BoxSection;
