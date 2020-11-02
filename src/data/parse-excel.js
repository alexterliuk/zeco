'use strict';
const fs = require('fs');
const path = require('path');
const readXlsxFile = require('read-excel-file');
const { companiesFaces, excelDataTypes } = require('./companies-faces');
const { makeRed } = require('./color-makers');
const requiredRows = require('./required-rows');
const getRowsFromParsedExcelData = require('./get-rows-from-parsed-excel-data')
  .default;
const buildCompanyProfile = require('./build-company-profile').default;
const updateCompanyProfile = require('./update-company-profile').default;

/**
 *
 * @returns {Promise<Array>}
 */
async function parseExcelToJson() {
  const pathsToParsed = [];

  for (const face of companiesFaces) {
    const id = face.id;
    const parsedDataFileNames = [];

    for (const dataType of excelDataTypes) {
      const slug = `${id}-${dataType}`;
      const pathToCompany = path.join(__dirname, `companies/${id}.ts`);
      const pathToExcel = path.join(__dirname, `companies-excel/${slug}.xlsx`);

      const companyExists = fs.existsSync(pathToCompany);
      if (companyExists) continue;

      const excelFileExists = fs.existsSync(pathToExcel);
      if (!excelFileExists) {
        const errMsg = `ENOENT: ${pathToExcel}'`;
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
        const data = fs.readFileSync(pathToExcel);
        const parsedExcel = await readXlsxFile(data);
        if (parsedExcel.length) {
          const _path = path.join(__dirname, `companies-parsed/${slug}.json`);
          fs.writeFileSync(_path, JSON.stringify(parsedExcel, null, 2));
          parsedDataFileNames.push(`${slug}.json`);
        }
      } catch (e) {
        console.log(makeRed(`Crashed when working with ${pathToExcel}'`));
        console.log(e);
      }
    }

    if (parsedDataFileNames.length) {
      pathsToParsed.push({ id, parsedDataFileNames });
    }
  }

  return pathsToParsed;
}

/**
 *
 * @param pathsToParsed
 * @returns {Promise<Array|*>}
 */
async function preConvertToCompanies(pathsToParsed) {
  if (!pathsToParsed.length) return [];

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

/**
 *
 * @param specs
 * @returns {Promise<void>}
 */
async function convertParsedExcelToCompanies(specs) {
  for (const spec of specs) {
    const exData = spec.args[0];
    const keys = spec.args[1];
    const parsedRequiredRows = getRowsFromParsedExcelData(
      exData,
      requiredRows,
      keys
    );
    const { id, shortName, usreou } = companiesFaces.find(
      c => c.id === spec.companyId
    );
    const companyProfile = buildCompanyProfile(id, shortName, usreou);

    if (companyProfile) {
      updateCompanyProfile(companyProfile, parsedRequiredRows);
      let companyProfileStr = JSON.stringify(companyProfile, null, 2);
      const _path = path.join(__dirname, `companies/${id}.ts`);

      const part1 = "import { CompanyProfile } from '../data';\n\n";
      const part2 = `const ${id}: CompanyProfile = {`;
      const part3 = companyProfileStr.slice(1);
      const part4 = `;\n\nexport default ${id};\n`;
      const composedStr = `${part1}${part2}${part3}${part4}`;

      fs.writeFileSync(_path, composedStr);
    }
  }
}

/**
 *
 * @returns {Promise<void>}
 */
async function parseExcel() {
  const pathsToParsed = await parseExcelToJson();
  const specs = await preConvertToCompanies(pathsToParsed);
  void convertParsedExcelToCompanies(specs);
}

void parseExcel();
