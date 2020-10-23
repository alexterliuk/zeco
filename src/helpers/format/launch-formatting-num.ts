import walkAndDo from './walk-and-do';

/**
 *
 * @param {number} num
 * @param {object} formats
 * @param {function} [doo]
 */
function launchFormattingNum(
  num: number,
  formats: { [f: string]: any },
  doo?: () => {}
) {
  const formatsObj =
    (typeof formats === 'object' && formats !== null && formats) || {};
  let str = '' + num;
  const minusAtStart = str[0] === '-' && ((str = str.slice(1)), true);
  const { gapAfter, dotDivider, addToStart, addToEnd } = formatsObj;
  const each = gapAfter;
  let dot,
    i = -1;

  while (++i < str.length) {
    if (str[i] === '.') {
      dot = true;
      break;
    }
  }

  const left = (dot && str.slice(0, i)) || str;
  const right = dot && str.slice(i + 1);
  const segments = [walkAndDo(left, { rtl: true, each, doo }).composed].concat(
    right ? walkAndDo(right, { each, doo }).composed : []
  );

  if (dot) segments.splice(1, 0, dotDivider ? '.' : ',');
  if (minusAtStart) segments.unshift('-');
  if (addToStart) segments.splice(0, 0, addToStart);
  if (addToEnd) segments.splice(segments.length, 0, addToEnd);

  return segments.join('').trim();
}

export default launchFormattingNum;
