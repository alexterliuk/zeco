import React from 'react';
import { CompanyId } from '../translations/translations';
import getCompanyAllDataPanel from './company-all-data-panel';

const CompanyAllDataAndCharts = ({
  companyId,
}: {
  companyId: CompanyId | string;
}) => {
  return companyId ? (
    <>
      {getCompanyAllDataPanel(companyId)}
      {/* charts will be here */}
    </>
  ) : null;
};

export default CompanyAllDataAndCharts;
