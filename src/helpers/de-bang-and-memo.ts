/**
 * If a string starts with '!' (bang), strip it off but remember that string had it.
 * Bang is optionally used in zecoConfig to indicate: display only value but not key.
 * @param {array} arr - with strings
 * @param {string} [name]
 */
function deBangAndMemo(
  arr: string[],
  name: string = 'deBanged'
): DeBangAndMemo {
  const result: DeBangAndMemo = { [name]: { arr: [], startsWithBang: {} } };

  return arr.reduce((acc, s) => {
    const bang = s[0] === '!';
    const key = bang ? s.slice(1) : s;

    acc[name].arr.push(key);
    acc[name].startsWithBang[key] = bang;
    return acc;
  }, result);
}

type DeBangAndMemo = {
  [key: string]: {
    arr: string[];
    startsWithBang: { [key: string]: boolean };
  };
};

export default deBangAndMemo;
