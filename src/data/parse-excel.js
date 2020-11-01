'use strict';
const fs = require('fs');
const path = require('path');
const readXlsxFile = require('read-excel-file');
const { companiesFaces, excelDataTypes } = require('./companies-faces');
const { makeRed } = require('./color-makers');

async function parseExcelToJson() {
  const pathsToParsed = [];

  for (const face of companiesFaces) {
    const id = face.id;
    const parsedDataFileNames = [];

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
          parsedDataFileNames.push(`${slug}.json`);
        }
      } catch (e) {
        console.log(makeRed(`Crashed when working with ${pathToFile}'`));
        console.log(e);
      }
    }

    if (parsedDataFileNames.length) {
      pathsToParsed.push({ id, parsedDataFileNames });
    }
  }

  return pathsToParsed;
}

async function preConvertToCompanies() {
  const pathsToParsed = await parseExcelToJson();
  if (!pathsToParsed.length) return;

  const fileNameEndings = `-(${excelDataTypes.join('|')}).json`;
  const pattern = new RegExp(fileNameEndings);
  const companiesJsonBundles = {};
  const companiesJsonBundlesPaths = [];

  for (const path of pathsToParsed) {
    const id = path.id;
    companiesJsonBundles[id] = {};
    companiesJsonBundlesPaths.push([id, []]);

    let fileName = path.parsedDataFileNames[0];
    let i = 0;

    while (fileName) {
      const end = fileName.match(pattern).index;
      const dataType = fileName.slice(end + 1, -5); //e.g. ...-zvit.json -> zvit
      const pathToJson = `./companies-parsed/${fileName}`;
      companiesJsonBundles[id][dataType] = require(pathToJson);

      const bundlesPaths = companiesJsonBundlesPaths;
      bundlesPaths[bundlesPaths.length - 1][1].push(dataType);

      fileName = path.parsedDataFileNames[++i];
    }
  }

  return companiesJsonBundlesPaths.reduce((acc, p) => {
    acc.push({
      companyId: p[0],
      args: [companiesJsonBundles[p[0]], p[1]],
    });
    return acc;
  }, []);
}
