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
                {theadRow.cells.map((period: string, i) => (
                  <Th key={`${period}${i}`}>{period}</Th>
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
  const currYear = '' + new Date().getFullYear();

  const {
    subheader,
    theadRow,
    tbodyRows,
    statementsIndicesInTbodyRows,
  } = companyData.reduce(
    (acc: CompanyAllDataPanelProps, curr: KeyValuePair) => {
      const indices = acc.statementsIndicesInTbodyRows;

      if (curr.key !== 'statements') {
        acc.subheader[curr.key] = curr.value;
      } else {
        acc.theadRow.name = 'timePeriod';
        acc.theadRow = makeTheadRow(curr.value, currYear);
        // acc.theadRow.cells is ['1q', '2q', '3q', '2016', '1q'...]
        const years = acc.theadRow.cells
          .filter(c => c.length === 4)
          .concat(currYear);
        acc.tbodyRows = makeEmptyTbodyRows(
          curr.value[years[0]],
          statementsBlocksKeys,
          indices,
          idx
        );

        for (const year of years) {
          for (const statement of statements[year]) {
            const key = statement.key;
            const yearIsCurr = year === currYear;
            if (statement.value.quarters) {
              makeTbodyRowsCells(
                acc.tbodyRows,
                indices,
                statement,
                [key],
                yearIsCurr
              );
            } else {
              // assets, financials
              // @ts-ignore
              const statBlock = statementsBlocksKeys[key];
              if (statBlock) {
                statBlock.forEach((k2: string) => {
                  const k = key === 'assets' ? `assets.${k2}` : k2;
                  makeTbodyRowsCells(
                    acc.tbodyRows,
                    indices,
                    statement,
                    [k, k2],
                    yearIsCurr
                  );
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
 * @param {object} yearStatements - {2016: [objects], 2017: [objects]...}
 * @param {string} currYear
 */
function makeTheadRow(
  yearStatements: { [key: number]: KeyValuePairs },
  currYear: string
) {
  return {
    name: 'timePeriod',
    cells: Object.keys(yearStatements).reduce((a: string[], year: string) => {
      return a.concat(['1q', '2q', '3q']).concat(year === currYear ? [] : year);
    }, []),
  };
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

/**
 * @param {array} tbodyRows - with {name, cells} objects
 * @param {object} statementsIndicesInTbodyRows - each key points to number
 * @param {object} statement - {name: '', value: { quarters, halfyear, year }}
 * @param {array} keys
 * @param {boolean} yearIsCurr
 */
function makeTbodyRowsCells(
  tbodyRows: CompanyAllDataTableRow[],
  statementsIndicesInTbodyRows: IndicesInTbodyRows,
  statement: KeyValuePair,
  keys: string[],
  yearIsCurr: boolean
) {
  const idx = statementsIndicesInTbodyRows[keys[0]];
  const row = tbodyRows[idx];
  const v = keys[1] ? statement.value[keys[1]] : statement.value;
  const cells = [v.quarters[0], v.quarters[1], v.quarters[2]].concat(
    yearIsCurr ? [] : v.year
  );
  row.cells = row.cells.concat(cells);
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
