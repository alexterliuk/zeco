import formatNum from './format-num';
import formatStr from './format-str';

/**
 *
 * @param {number | string | boolean | undefined} val
 * @param {...string} formats
 */
function format(
  val: number | string | boolean | undefined,
  ...formats: string[] | string[][]
) {
  const num = typeof val === 'number' && val;
  const str = typeof val === 'string' && val;

  // @ts-ignore
  // TS raises not-existing-type error if tsconfig.json has 'target: es5'
  const _formats = formats.flat();

  return (
    (num && formatNum(num, _formats)) ||
    (str && formatStr(str, _formats)) ||
    val
  );
}

export default format;
