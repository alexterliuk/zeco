/**
 *
 * @param {object} exData - with arrays (parsed excel file) of arrays (rows) of strings
 * @param {object} reqRows - needed rows
 * @param {array} names - with strings
 */
function getRowsFromExcelData(
  exData: ParsedExcelData,
  reqRows: RequiredExcelDataRows,
  names: excelDataFileNames[]
) {
  return names.reduce((acc: RowsFromExcelData[], name, i) => {
    if (!exData[name]) return [];
    acc[i] = exData[name].reduce((acc: RowsFromExcelData, row, i) => {
      const reqRow = reqRows[name].filter(r => r.i === i)[0];
      if (reqRow) acc[reqRow.name] = row;
      return acc;
    }, {});
    return acc;
  }, []);
}

type RowsFromExcelData = {
  [key: string]: string[];
};

type ParsedExcelData = {
  [key in excelDataFileNames]: string[][];
};

type RequiredExcelDataRows = {
  [key in excelDataFileNames]: { i: number; name: string }[];
};

type excelDataFileNames = 'finZvit' | 'finCoeff' | 'finBalance';

export default getRowsFromExcelData;
