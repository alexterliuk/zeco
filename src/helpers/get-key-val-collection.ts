import { KeyValuePair, KeyValuePairs } from './extract-key-value-pairs';
import { FinancialStatement } from '../data/data';
import pickData from './pick-data';

function getKeyValCollection(
  statementsOfYear: KeyValuePairs,
  keys: string[],
  splitKeys?: string[][][],
  period: { quarter: number } = { quarter: -1 }
): KeyValuePairs {
  if (!statementsOfYear) return [];

  const getValueByPeriod = (item: FinancialStatement) => {
    if (item.quarters) {
      const { quarter } = period;
      const validQ = [0, 1, 2, 3].includes(quarter);
      return validQ ? item.quarters[quarter] : item.year;
    }
  };

  const getKeyValCollectionFromSplitKeys = (): KeyValuePairs | void => {
    return (
      splitKeys &&
      splitKeys.map(splits => {
        const collection = [];
        // splits is an OR expression where each operand (split) is arr
        for (const split of splits) {
          // split contains one or more path segments -
          // e.g. ['foo', 'doo'] which when composed is 'foo.doo'
          const segm0 = split[0];
          const statement = statementsOfYear.find(obj => obj.key === segm0);
          if (statement) {
            const keyVal =
              split.length === 1
                ? {
                    key: statement.key,
                    value: getValueByPeriod(statement.value),
                  }
                : {
                    key:
                      split[0] === 'financials'
                        ? split.slice(1).join('.')
                        : split.join('.'),
                    value: getValueByPeriod(
                      pickData(statement.value, split.slice(1))
                    ),
                  };
            collection.push(keyVal);
          }
        }
        return getOneKeyValFromORArr(collection);
      })
    );
  };

  // return first record whose value is not undefined or not false,
  // or return last value
  const getOneKeyValFromORArr = (records: KeyValuePairs): KeyValuePair => {
    for (const rec of records) {
      if (rec.value !== undefined && rec.value !== false) {
        return rec;
      }
    }
    return records[records.length - 1];
  };

  const getKeyValCollectionFromKeys = (): KeyValuePairs => {
    return statementsOfYear.reduce((acc: KeyValuePairs, rec) => {
      if (keys.includes(rec.key)) {
        acc.push({
          key: rec.key,
          value: getValueByPeriod(rec.value),
        });
      }
      return acc;
    }, []);
  };

  return getKeyValCollectionFromSplitKeys() || getKeyValCollectionFromKeys();
}

export default getKeyValCollection;
