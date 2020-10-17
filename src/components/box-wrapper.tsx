import React from 'react';
import styled from 'styled-components';
import Box from './box';
import companiesData from '../data/companies-data';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin: 10px;
  padding: 5px;
  max-width: 762px;
`;

const BoxWrapper = () => (
  <>
    <Container>
      {companiesData.map(company => {
        const { name, id } = company;
        const profit = company.financials[2020].netProfit.quarters[1] > 0;

        return <Box name={name} profit={profit} id={id} key={id} />;
      })}
    </Container>
  </>
);

export default BoxWrapper;
