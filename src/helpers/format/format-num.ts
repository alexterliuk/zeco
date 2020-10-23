import setDefaultFormat from './set-default-format';
import launchFormattingNum from './launch-formatting-num';

const formats: { [f: string]: { [opt: string]: any } } = {
  gap1: { gapAfter: 1 }, // if no gapN given, gap3 is used
  gap2: { gapAfter: 2 },
  gap3: { gapAfter: 3 },
  dot: { dotDivider: true }, // if absent, comma is used
  percent: { addToEnd: '%' },
  usd: { addToStart: '$' },
  uah: { addToStart: '₴' },
  // this is example of doo function
  // it may perform any operation with string or do something unrelated to string
  // it is expected that it returns string
  // obfuscate: { doo: (segm, segmLastCharIdxInStr, str) => segm + ' ',
};

/**
 *
 * @param {number} num
 * @param {array} givenFormats - with strings
 */
function formatNum(num: number, givenFormats: string[]): string {
  let doo: undefined;

  const composedFormats = givenFormats.reduce((acc, f: string) => {
    if (formats.hasOwnProperty(f)) {
      if (formats[f].doo) {
        doo = formats[f].doo;
      } else {
        acc = { ...acc, ...formats[f] };
      }
    }

    return acc;
  }, {});

  setDefaultFormat(composedFormats, 'gapAfter', 3);

  return launchFormattingNum(num, composedFormats, doo);
}

export default formatNum;
