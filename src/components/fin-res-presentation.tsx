import React, { useState } from 'react';
import styled from 'styled-components';
import BoxSection from './box-section';
import CompanyPanelSection from './company-panel-section';

const Container = styled.section`
  margin: 10px;
  padding: 5px;
`;

const FinResPresentation = () => {
  const [companyId, setCompanyId] = useState('');

  return (
    <Container>
      <BoxSection setCompanyId={setCompanyId} />
      <CompanyPanelSection id={companyId} />
    </Container>
  );
};

export default FinResPresentation;
