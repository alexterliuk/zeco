import formatNum from './format-num';
import formatStr from './format-str';
import { isStringifiedNumberEndingWithPercent } from '../value-checker';

/**
 *
 * @param {number | string | boolean | undefined} val
 * @param {...string} formats
 */
function format(
  val: number | string | boolean | undefined,
  ...formats: string[] | string[][]
) {
  const strNumPercent = isStringifiedNumberEndingWithPercent(val);
  const num = typeof val === 'number' && val;
  const str = typeof val === 'string' && val;

  // @ts-ignore
  // TS raises not-existing-type error if tsconfig.json has 'target: es5'
  const _formats = formats.flat();

  return (
    (strNumPercent && formatNumThenAddPercent(val, _formats)) ||
    (num && formatNum(num, _formats)) ||
    (str && formatStr(str, _formats)) ||
    val
  );
}

function formatNumThenAddPercent(val: any, formats: string[]) {
  const formattedVal = formatNum(+val.slice(0, -1), formats);
  return `${formattedVal}%`;
}

export default format;
