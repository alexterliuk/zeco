import React from 'react';
import styled from 'styled-components';
import Box from './box';
import companies from '../data/companies/index';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin: 10px;
  padding: 5px;
  max-width: 762px;
`;

const BoxWrapper = () => {
  const boxes = companies._ids.map(k => {
    // @ts-ignore
    const company: CompanyProfile = companies[k];
    const { name, id } = company;
    const profit = company.financials[2020].netProfit.quarters[1] > 0;

    return <Box name={name} profit={profit} id={id} key={id} />;
  });

  return (
    <>
      <Container>{boxes}</Container>
    </>
  );
};

export default BoxWrapper;
