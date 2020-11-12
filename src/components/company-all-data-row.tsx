import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translate } from '../translations/translate';
import getCompanyAllDataPanel from './company-all-data-panel';

const Row = styled.div`
  padding: 15px;
  border-bottom: 1px solid lightgrey;
`;

const CompanyAllDataRow = function ({ id }: { id: string }) {
  const [companyAllDataPanel, setCompanyAllDataPanel] = useState(null);

  const toggleCompanyAllDataPanel = (id: string) => {
    setCompanyAllDataPanel(
      companyAllDataPanel ? null : getCompanyAllDataPanel(id)
    );
  };

  const translatedName = translate(id, 'companies', 'shortName');

  return (
    <Row role="button" onClick={() => toggleCompanyAllDataPanel(id)}>
      {translatedName}
      {companyAllDataPanel}
    </Row>
  );
};

CompanyAllDataRow.propTypes = {
  id: PropTypes.string,
};

export default CompanyAllDataRow;
