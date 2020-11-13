import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getCompanyData from '../helpers/get-company-data';
import CompanyPanel from './company-panel';

const Container = styled.section`
  /*background: #f9f8f8;*/
  margin-top: 2.5rem;
`;

const CompanyPanelSection = ({
  id,
  companyPanelOpacity,
}: CompanyPanelSectionProps) => {
  const companyData = getCompanyData(id);

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

export default CompanyPanelSection;
