import formatNum from './format-num';
import formatStr from './format-str';

/**
 *
 * @param {number|string} numOrStr
 * @param {...string} formats
 */
function format(
  numOrStr: number | string,
  ...formats: string[]
): string | number {
  const num = typeof numOrStr === 'number' && numOrStr;
  const str = typeof numOrStr === 'string' && numOrStr;

  return (
    (num && formatNum(num, formats)) ||
    (str && formatStr(str, formats)) ||
    numOrStr
  );
}

export default format;
