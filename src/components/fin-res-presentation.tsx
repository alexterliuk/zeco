import React, { useState } from 'react';
import styled from 'styled-components';
import BoxSection from './box-section';
import CompanyPanelSection from './company-panel-section';
import delayAndCall from '../helpers/delay-and-call';

const Container = styled.section`
  margin: 10px;
  padding: 5px;
`;

const FinResPresentation = () => {
  const [companyId, setCompanyId] = useState('');
  const [companyPanelOpacity, setCompanyPanelOpacity] = useState(1);

  const delay = 150;
  const update = (id: string) => {
    setCompanyId(id);
  };
  const preUpdate = () => {
    setCompanyPanelOpacity(0);
  };
  const postUpdate = () => {
    setCompanyPanelOpacity(1);
  };

  const updateCompanyPanel = (id: string) => {
    if (companyId !== id) {
      delayAndCall(update.bind(null, id), delay, preUpdate, postUpdate);
    }
  };

  return (
    <Container>
      <BoxSection updateCompanyPanel={updateCompanyPanel} />
      <CompanyPanelSection
        companyPanelOpacity={companyPanelOpacity}
        id={companyId}
      />
    </Container>
  );
};

export default FinResPresentation;
