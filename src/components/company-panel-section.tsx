import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getCompanyData from '../helpers/get-company-data';
import CompanyPanel from './company-panel';
import { ParsedTimePeriod } from '../data/update-company-profile';

const Container = styled.section`
  /*background: #f9f8f8;*/
  margin-top: 2.5rem;
`;

const CompanyPanelSection = ({
  id,
  companyPanelOpacity,
  timePeriod,
}: CompanyPanelSectionProps) => {
  const companyData = getCompanyData(id);

  return (
    <Container>
      <CompanyPanel
        companyData={companyData}
        companyPanelOpacity={companyPanelOpacity}
        timePeriod={timePeriod}
      />
    </Container>
  );
};

CompanyPanelSection.propTypes = {
  id: PropTypes.string,
  companyPanelOpacity: PropTypes.number,
  timePeriod: PropTypes.object,
};

interface CompanyPanelSectionProps {
  id: string;
  companyPanelOpacity: number;
  timePeriod: ParsedTimePeriod;
}

export default CompanyPanelSection;
