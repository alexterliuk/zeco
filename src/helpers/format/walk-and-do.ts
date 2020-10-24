/**
 * Iteration layer for formatting a string. Every complete cycle ends with
 * calling a user provided doo (if any) or defaultDoo (which adds default space).
 * A cycle is complete when composed char segment's length === options.each.
 * User provided doo function may mutate string or not, or may perform some
 * unrelated to string actions, in either case it is expected to return a string.
 *   doo's signature:
 *     (segm, segmLastCharIdxInStr, str) => {...}
 *       segm is current composed char segment
 *       segmLastCharIdxInStr is index
 *       str is original whole string
 *   walkAndDo's options structure:
 *   {
 *     rtl?: boolean,   // if absent, 'ltr' applied
 *     doo?: function,  // if absent, defaultDoo is applied - it adds a space
 *                      //           to start (if rtl) or to end of each segm
 *     each?: number,   // if absent, call doo or defaultDoo after each char
 *     stop?: number,   // if absent, go over all str
 *   }
 * @param {string} str
 * @param {object} [options]
 */
function walkAndDo(str: string, options?: WalkAndDoOptions): WalkAndDoReturn {
  const validStr = str?.length > 0;
  if (!validStr || typeof options !== 'object' || options === null) {
    return { composed: '', split: [] };
  }

  const rtl = options.rtl;

  const defaultDoo = (
    segm: string,
    segmLastCharIdxInStr: number,
    str: string
  ) => {
    return rtl ? ` ${segm}` : `${segm} `;
  };
  const doo = typeof options.doo === 'function' ? options.doo : defaultDoo;

  // @ts-ignore
  const each = (options.each > 0 && options.each) || 0;
  // @ts-ignore
  const stop = rtl ? str.length - options.stop - 1 : options.stop;
  let i = rtl ? str.length - 1 : 0;
  const splitStr = [str[i]];
  const action = rtl ? 'unshift' : 'push';

  const check = (i: number) => (rtl ? i !== -1 : i !== str.length);
  const changeI = () => (rtl ? --i : ++i);
  const getEdge = () => (rtl ? 0 : splitStr.length - 1);
  const buildSegm = (charSet: string, char: string) => {
    return rtl ? char + charSet : charSet + char;
  };

  while (check(i)) {
    const edge = getEdge();
    // char segment is complete if each is 0 or remainder is 0
    const segm = !each || !(splitStr[edge].length % each);
    if (!segm) {
      changeI();
      if (i === stop) break;
      if (str[i] !== undefined) {
        splitStr[edge] = buildSegm(splitStr[edge], str[i]);
      }
      continue;
    }

    splitStr[edge] = <string>doo(splitStr[edge], i, str);
    changeI();
    if (i === stop) break;
    if (str[i] !== undefined) {
      splitStr[action](str[i]);
    }
  }

  return { composed: splitStr.join(''), split: splitStr };
}

interface WalkAndDoOptions {
  rtl?: boolean;
  doo?: () => {};
  each?: number;
  stop?: number;
}

interface WalkAndDoReturn {
  composed: string;
  split: string[];
}

export default walkAndDo;
