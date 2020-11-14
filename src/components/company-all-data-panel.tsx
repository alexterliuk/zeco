import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import getCompanyData from '../helpers/get-company-data';
import wrapInMemoContext from '../helpers/wrap-in-memo-context';
import { translate } from '../translations/translate';
import { format, getFinFormatsForValue } from '../helpers/format/index';
import {
  KeyValuePair,
  KeyValuePairs,
} from '../helpers/extract-key-value-pairs';

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

const TableWrapper = styled.div`
  box-shadow: 0px 0px 10px 1px #d4d9dc;
  border-radius: 4px;
  padding: 0.1px 20px;
`;

const TableScrollWrapper = styled.div`
  overflow-x: auto;
`;

const Th = styled.th`
  min-width: 136px;
`;

const Td = styled.td`
  min-width: 136px;
`;

const CompanyAllDataPanel = ({
  subheader,
  theadRow,
  tbodyRows,
  statementsIndicesInTbodyRows,
}: CompanyAllDataPanelProps) => {
  const { id, usreou } = subheader;
  const showInTable: string[] = zecoConfig.getItem([
    'showInCompanyAllDataPanel',
  ]).table;

  const _tbodyRows: CompanyAllDataTableRow[] = showInTable.map(key => {
    const idx = statementsIndicesInTbodyRows[key];
    return tbodyRows[idx];
  });

  return (
    <div>
      <h3>{translate(id, 'companies', 'name')}</h3>
      <Subheader>
        <Location>{translate(id, 'companies', 'location')}</Location>
        <Usreou>
          {translate(id, 'companyKeys', 'usreou')} {usreou}
        </Usreou>
      </Subheader>
      <TableWrapper>
        <TableScrollWrapper>
          <table>
            <thead>
              <tr>
                <Th />
                {theadRow.cells.map((period: string) => (
                  <Th key={period}>{period}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {_tbodyRows.map((row, i) => {
                // @ts-ignore
                const translatedName = translate(id, 'companyKeys', row.name);
                return (
                  <tr key={`tr${i}`}>
                    <Td key={'name'}>{translatedName}</Td>
                    {row.cells.map((val, i) => (
                      <Td key={`td${i}`}>
                        {format(val, getFinFormatsForValue(row.name))}
                      </Td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScrollWrapper>
      </TableWrapper>
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
  const statementsBlocksKeys: BlocksKeys = { assets: [], financials: [] };
  const idx = { val: -1 };

  const {
    subheader,
    theadRow,
    tbodyRows,
    statementsIndicesInTbodyRows,
  } = companyData.reduce(
    (acc: CompanyAllDataPanelProps, curr: KeyValuePair) => {
      if (curr.key !== 'statements') {
        acc.subheader[curr.key] = curr.value;
      } else {
        acc.theadRow.name = 'timePeriod';
        acc.theadRow.cells = Object.keys(curr.value);

        const year = acc.theadRow.cells[0];
        acc.tbodyRows = makeEmptyTbodyRows(
          curr.value[year],
          statementsBlocksKeys,
          acc.statementsIndicesInTbodyRows,
          idx
        );

        for (const year of acc.theadRow.cells) {
          for (const statYear of statements[year]) {
            const key = statYear.key;
            if (statYear.value.quarters) {
              const idx = acc.statementsIndicesInTbodyRows[key];
              acc.tbodyRows[idx].cells.push(statYear.value.year);
            } else {
              // assets, financials
              // @ts-ignore
              const statBlock = statementsBlocksKeys[key];
              if (statBlock) {
                statBlock.forEach((key2: string) => {
                  const k = key === 'assets' ? `assets.${key2}` : key2;
                  const idx = acc.statementsIndicesInTbodyRows[k];
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
      statementsIndicesInTbodyRows: {},
    }
  );

  return (
    <CompanyAllDataPanel
      subheader={subheader}
      theadRow={theadRow}
      tbodyRows={tbodyRows}
      statementsIndicesInTbodyRows={statementsIndicesInTbodyRows}
    />
  );
}

/**
 * @param {array} yearKeyValueStatements - with {key, value} objects
 * @param {object} statementsBlocksKeys - of {assets: [], financials: []} shape
 * @param {object} statementsIndicesInTbodyRows - each key points to number
 * @param {object} idxObj - {val: -1}
 */
function makeEmptyTbodyRows(
  yearKeyValueStatements: KeyValuePairs,
  statementsBlocksKeys: BlocksKeys,
  statementsIndicesInTbodyRows: IndicesInTbodyRows,
  idxObj: { val: number }
) {
  return yearKeyValueStatements.reduce(
    (acc: CompanyAllDataTableRow[], item: KeyValuePair) => {
      if (item.value.quarters) {
        acc.push({ name: item.key, cells: [] });
        statementsIndicesInTbodyRows[item.key] = ++idxObj.val;
      } else {
        const as = item.key === 'assets' && 'assets';
        const fi = item.key === 'financials' && 'financials';

        const rows = Object.keys(item.value).map((k: string) => {
          const name = as ? `${as}.${k}` : k;
          statementsIndicesInTbodyRows[name] = ++idxObj.val;

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
}

interface CompanyAllDataPanelProps {
  subheader: { [key: string]: string };
  theadRow: CompanyAllDataTableRow;
  tbodyRows: CompanyAllDataTableRow[];
  statementsIndicesInTbodyRows: IndicesInTbodyRows;
}

interface CompanyAllDataTableRow {
  name: string;
  cells: string[];
}

interface BlocksKeys {
  assets: string[];
  financials: string[];
}

interface IndicesInTbodyRows {
  [key: string]: number;
}

export default getCompanyAllDataPanel;
