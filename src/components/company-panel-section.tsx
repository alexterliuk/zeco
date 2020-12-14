import React from 'react';
import PropTypes from 'prop-types';
import getCompanyData from '../helpers/get-company-data';
import CompanyPanel from './company-panel';
import { ParsedTimePeriod } from '../data/update-company-profile';
import { translateCommon } from '../translations/translate';

const CompanyPanelSection = ({
  id,
  companyPanelOpacity,
  timePeriod,
}: CompanyPanelSectionProps) => {
  const companyData = getCompanyData(id);

  return (
    <section>
      {companyData.length ? (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          {translateCommon('dataGivenInKHryvnias')}
        </p>
      ) : null}
      <CompanyPanel
        companyData={companyData}
        companyPanelOpacity={companyPanelOpacity}
        timePeriod={timePeriod}
      />
    </section>
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
