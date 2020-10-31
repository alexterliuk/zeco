const fs = require('fs');
const path = require('path');
const readXlsxFile = require('read-excel-file');
const { companiesIds, excelDataTypes } = require('./companies-ids');
const { makeRed } = require('./color-makers');

async function parseExcelToJson() {
  const parsedFileNames = [];

  for (const id of companiesIds) {
    for (const dataType of excelDataTypes) {
      const slug = `${id}-${dataType}`;
      const pathToFile = path.join(__dirname, `companies-excel/${slug}.xlsx`);

      const fileExists = fs.existsSync(pathToFile);
      if (!fileExists) {
        const errMsg = `ENOENT: ${pathToFile}'`;
        console.log(makeRed(errMsg));
        try {
          const pathToLog = path.join(__dirname, 'err-logs/errors.txt');
          const time = new Date().toUTCString();
          fs.appendFileSync(pathToLog, `${time} - ${errMsg}\n`);
        } catch (e) {
          console.log(makeRed(e.message));
        }
        continue;
      }

      try {
        const data = fs.readFileSync(pathToFile);
        const parsedExcel = await readXlsxFile(data);
        if (parsedExcel.length) {
          const _path = path.join(__dirname, `companies-parsed/${slug}.json`);
          fs.writeFileSync(_path, JSON.stringify(parsedExcel, null, 2));
          parsedFileNames.push(slug);
        }
      } catch (e) {
        console.log(makeRed(`Crashed when working with ${pathToFile}'`));
        console.log(e);
      }
    }
  }

  return parsedFileNames;
}
