import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import zecoConfig from '../../config/zeco-config';
import getCompanyData from '../helpers/get-company-data';
import wrapInMemoContext from '../helpers/wrap-in-memo-context';
import { translate, translateTimePeriod } from '../translations/translate';
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
  currYear,
}: CompanyAllDataPanelProps) => {
  const { id, usreou } = subheader;
  const {
    cols,
    rows,
  }: {
    cols: ColsConfig;
    rows: string[];
  } = zecoConfig.getItem(['showInCompanyAllDataPanel']).table;

  const yearIndicesInTheadRow = theadRow.cells.reduce(
    (acc: Indices, period, i) => {
      if (cols.years.includes(period)) {
        acc[period] = i;
      }
      return acc;
    },
    {}
  );

  let [_theadRow, _tbodyRows] = filterColumns(
    cols,
    yearIndicesInTheadRow,
    theadRow,
    tbodyRows,
    currYear
  );
  _tbodyRows = filterRows(_tbodyRows, rows, statementsIndicesInTbodyRows);

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
                {_theadRow.cells.map((period: string, i) => (
                  <Th key={`${period}${i}`}>{translateTimePeriod(period)}</Th>
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
  statementsIndicesInTbodyRows: PropTypes.object,
  currYear: PropTypes.string,
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
    (acc: Omit<CompanyAllDataPanelProps, 'currYear'>, curr: KeyValuePair) => {
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
      currYear={currYear}
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
  statementsIndicesInTbodyRows: Indices,
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
 * @param {object} statementsIndicesInTbodyRows - {netProfit: 3, equity: 14...}
 * @param {object} statement - {name: '', value: { quarters, halfyear, year }}
 * @param {array} keys
 * @param {boolean} yearIsCurr
 */
function makeTbodyRowsCells(
  tbodyRows: CompanyAllDataTableRow[],
  statementsIndicesInTbodyRows: Indices,
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

/**
 *
 * @param {object} colsConfig - zecoConfig.showInCompanyAllDataPanel.table.cols
 * @param {object} yearIndicesInTheadRow - { 2016: 3, 2017: 7... }
 * @param {object} theadRow - {name, cells}
 * @param {array} tbodyRows - with {name, cells} objects
 * @param {string} currYear
 */
function filterColumns(
  colsConfig: ColsConfig,
  yearIndicesInTheadRow: Indices,
  theadRow: CompanyAllDataTableRow,
  tbodyRows: CompanyAllDataTableRow[],
  currYear: string
) {
  return colsConfig.years.reduce(
    (acc: [CompanyAllDataTableRow, CompanyAllDataTableRow[]], year, i) => {
      const idx = yearIndicesInTheadRow[year];
      const qrs = colsConfig.quarters;

      if (yearIndicesInTheadRow.hasOwnProperty(year)) {
        const [start, end] = [idx - (qrs ? 3 : 0), idx + 1];
        const periods = theadRow.cells.slice(start, end);
        filterCells(acc[0], periods, acc[1], tbodyRows, start, end);
      }

      // when last val, look if currYear's quarters should be shown
      if (colsConfig.years[i + 1] === undefined) {
        if (colsConfig.years[i] === currYear && colsConfig.currYearQuarters) {
          const currYearQuarters = tbodyRows[0].cells.slice(-3);
          const qty = currYearQuarters.filter(c => c !== undefined).length;
          const len = theadRow.cells.length;
          const [start, end] = [len - 3, len - qty + 1];
          const periods = theadRow.cells.slice(start, end);
          filterCells(acc[0], periods, acc[1], tbodyRows, start, end);
        }
      }

      return acc;
    },
    [
      { name: 'timePeriod', cells: [] },
      tbodyRows.map(r => ({ name: r.name, cells: [] })),
    ]
  );
}

/**
 * @param {object} _theadRow - {name, cells}
 * @param {array} periods - with strings
 * @param {array} _tbodyRows - with {name, cells} objects
 * @param {array} tbodyRows - with {name, cells} objects
 * @param {number} start
 * @param {number} end
 */
function filterCells(
  _theadRow: CompanyAllDataTableRow,
  periods: string[],
  _tbodyRows: CompanyAllDataTableRow[],
  tbodyRows: CompanyAllDataTableRow[],
  start: number,
  end: number
) {
  _theadRow.cells = _theadRow.cells.concat(periods);
  _tbodyRows.forEach((row, i) => {
    row.cells = row.cells.concat(tbodyRows[i].cells.slice(start, end));
  });
}

/**
 * @param {array} _tbodyRows - with {name, cells} objects
 * @param {array} rowsConfig - zecoConfig.showInCompanyAllDataPanel.table.rows
 * @param {object} statementsIndicesInTbodyRows - {netProfit: 3, equity: 14...}
 */
function filterRows(
  _tbodyRows: CompanyAllDataTableRow[],
  rowsConfig: string[],
  statementsIndicesInTbodyRows: Indices
) {
  return rowsConfig.map(key => {
    const idx = statementsIndicesInTbodyRows[key];
    return _tbodyRows[idx];
  });
}

interface CompanyAllDataPanelProps {
  subheader: { [key: string]: string };
  theadRow: CompanyAllDataTableRow;
  tbodyRows: CompanyAllDataTableRow[];
  statementsIndicesInTbodyRows: Indices;
  currYear: string;
}

interface CompanyAllDataTableRow {
  name: string;
  cells: string[];
}

interface BlocksKeys {
  assets: string[];
  financials: string[];
}

interface Indices {
  [key: string]: number;
}

interface ColsConfig {
  years: string[];
  quarters: boolean;
  currYearQuarters: boolean;
}

export default getCompanyAllDataPanel;
