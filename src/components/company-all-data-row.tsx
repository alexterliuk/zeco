import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translate } from '../translations/translate';
import getCompanyAllDataPanel from './company-all-data-panel';
import useLangContext from '../hooks/use-lang-context';

const Row = styled.div`
  border-bottom: 1px solid lightgrey;
`;

const Title = styled.div`
  padding: 15px;
  cursor: pointer;
`;

const CompanyAllDataRow = function ({ id }: { id: string }) {
  const [
    companyAllDataPanel,
    setCompanyAllDataPanel,
  ] = useState<JSX.Element | null>(null);
  const [translatedName, translateName] = useState(
    translate(id, 'companies', 'shortName')
  );

  useEffect(() => {
    const boundTranslate = translate.bind(null, id, 'companies', 'shortName');
    const updater = useLangContext.on(id, translateName, boundTranslate);
    return () => {
      useLangContext.off(updater);
    };
  }, []);

  const toggleCompanyAllDataPanel = (id: string) => {
    setCompanyAllDataPanel(() =>
      companyAllDataPanel ? null : getCompanyAllDataPanel(id)
    );
  };

  return (
    <Row>
      <Title role="button" onClick={() => toggleCompanyAllDataPanel(id)}>
        {translatedName}
      </Title>
      {companyAllDataPanel}
    </Row>
  );
};

CompanyAllDataRow.propTypes = {
  id: PropTypes.string,
};

export default CompanyAllDataRow;
