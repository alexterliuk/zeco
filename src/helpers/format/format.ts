import formatNum from './format-num';
import formatStr from './format-str';

/**
 *
 * @param {number|string} numOrStr
 * @param {...string} formats
 */
function format(
  numOrStr: number | string,
  ...formats: string[] | string[][]
): string | number {
  const num = typeof numOrStr === 'number' && numOrStr;
  const str = typeof numOrStr === 'string' && numOrStr;

  // @ts-ignore
  // TS raises not-existing-type error if tsconfig.json has 'target: es5'
  const _formats = formats.flat();

  return (
    (num && formatNum(num, _formats)) ||
    (str && formatStr(str, _formats)) ||
    numOrStr
  );
}

export default format;
