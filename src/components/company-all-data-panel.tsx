import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getCompanyData from '../helpers/get-company-data';
import wrapInMemoContext from '../helpers/wrap-in-memo-context';
import {
  KeyValuePair,
  KeyValuePairs,
} from '../helpers/extract-key-value-pairs';
import { translate } from '../translations/translate';
import {
  TranslationsType,
  TranslationsCompanyKey,
} from '../translations/translations';

const Subheader = styled.div`
  display: flex;
`;

const Location = styled.h4`
  display: inline-flex;
`;

const Usreou = styled.h4`
  display: inline-flex;
  margin-left: auto;
`;

const CompanyAllDataPanel = ({ subheader }: CompanyAllDataPanelProps) => {
  const { id, usreou } = subheader;

  return (
    <div>
      <h3>{translate(id, 'companies', 'name')}</h3>
      <Subheader>
        <Location>{translate(id, 'companies', 'location')}</Location>
        <Usreou>
          {translate(id, 'companyKeys', 'usreou')} {usreou}
        </Usreou>
      </Subheader>
    </div>
  );
};

CompanyAllDataPanel.propTypes = {
  subheader: PropTypes.object,
};

/**
 * @param {string} id
 */
let getCompanyAllDataPanel = (id: string) => {
  return _getCompanyAllDataPanel(id, getCompanyData(id));
};

/**
 * @param {string} id
 * @param {array} companyData - with {key, value} objects
 */
let _getCompanyAllDataPanel = (id: string, companyData: KeyValuePairs) => {
  return composeCompanyAllDataPanel(id, companyData);
};
// furnish _getCompanyAllDataPanel with memoization capabilities
_getCompanyAllDataPanel = wrapInMemoContext(_getCompanyAllDataPanel);

/**
 * @param {string} id
 * @param {array} companyData - with {key, value} objects
 */
function composeCompanyAllDataPanel(id: string, companyData: KeyValuePairs) {
  const { subheader } = companyData.reduce(
    (acc: CompanyAllDataPanelProps, curr: KeyValuePair) => {
      if (curr.key !== 'statements') {
        acc.subheader[curr.key] = curr.value;
      }

      return acc;
    },
    {
      subheader: {},
    }
  );

  return <CompanyAllDataPanel subheader={subheader} />;
}

interface CompanyAllDataPanelProps {
  subheader: { [key: string]: string };
}

export default getCompanyAllDataPanel;
