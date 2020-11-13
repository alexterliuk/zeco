import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getCompanyData from '../helpers/get-company-data';
import wrapInMemoContext from '../helpers/wrap-in-memo-context';
import { format, getFinFormatsForValue } from '../helpers/format/index';
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

const CompanyAllDataPanel = ({
  subheader,
  theadRow,
  tbodyRows,
}: CompanyAllDataPanelProps) => {
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
      <table>
        <thead>
          <tr>
            <td />
            {theadRow.cells.map((period: string) => (
              <th key={period}>{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbodyRows.map(row => {
            // @ts-ignore
            const translatedName = translate(id, 'companyKeys', row.name);
            return (
              <tr>
                <td>{translatedName}</td>
                {row.cells.map(val => (
                  <td>{format(val, getFinFormatsForValue(row.name))}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

CompanyAllDataPanel.propTypes = {
  subheader: PropTypes.object,
  theadRow: PropTypes.object,
  tbodyRows: PropTypes.array,
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
  const statements = companyData.filter(d => d.key === 'statements')[0].value;
  const statementsBlocksKeys: { assets: string[]; financials: string[] } = {
    assets: [],
    financials: [],
  };
  let statementsIndicesInTbodyRows: { [key: string]: number } = {};
  let idx = -1;
  const { subheader, theadRow, tbodyRows } = companyData.reduce(
    (acc: CompanyAllDataPanelProps, curr: KeyValuePair) => {
      if (curr.key !== 'statements') {
        acc.subheader[curr.key] = curr.value;
      } else {
        acc.theadRow.name = 'timePeriod';
        acc.theadRow.cells = Object.keys(curr.value);

        const year = acc.theadRow.cells[0];
        acc.tbodyRows = curr.value[year].reduce(
          (acc: CompanyAllDataTableRow[], item: KeyValuePair) => {
            if (item.value.quarters) {
              acc.push({ name: item.key, cells: [] });
              statementsIndicesInTbodyRows[item.key] = ++idx;
            } else {
              const as = item.key === 'assets' && 'assets';
              const fi = item.key === 'financials' && 'financials';

              const rows = Object.keys(item.value).map((k: string) => {
                const name = as ? `${as}.${k}` : k;
                statementsIndicesInTbodyRows[name] = ++idx;

                if (as) statementsBlocksKeys[as].push(k);
                if (fi) statementsBlocksKeys[fi].push(k);

                return { name, cells: [] };
              });
              acc = acc.concat(rows);
            }
            return acc;
          },
          []
        );

        for (const year of acc.theadRow.cells) {
          for (const statYear of statements[year]) {
            const key = statYear.key;
            if (statYear.value.quarters) {
              const idx = statementsIndicesInTbodyRows[key];
              acc.tbodyRows[idx].cells.push(statYear.value.year);
            } else {
              // assets, financials
              // @ts-ignore
              const statBlock = statementsBlocksKeys[key];
              if (statBlock) {
                statBlock.forEach((key2: string) => {
                  const k = key === 'assets' ? `assets.${key2}` : key2;
                  const idx = statementsIndicesInTbodyRows[k];
                  acc.tbodyRows[idx].cells.push(statYear.value[key2].year);
                });
              }
            }
          }
        }
      }
      return acc;
    },
    {
      subheader: {},
      theadRow: { name: '', cells: [] },
      tbodyRows: [],
    }
  );

  return (
    <CompanyAllDataPanel
      subheader={subheader}
      theadRow={theadRow}
      tbodyRows={tbodyRows}
    />
  );
}

interface CompanyAllDataPanelProps {
  subheader: { [key: string]: string };
  theadRow: CompanyAllDataTableRow;
  tbodyRows: CompanyAllDataTableRow[];
}

interface CompanyAllDataTableRow {
  name: string;
  cells: string[];
}

export default getCompanyAllDataPanel;
