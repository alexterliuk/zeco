/**
 * Split stringified path to segments. For example:
 * 'netIncome|assets.fixed' ->
 * {
 *   name: 'netIncome|assets.fixed',
 *   parsedPath: [['netIncome'], ['assets', 'fixed']],
 *   splitAllPath: ['netIncome', '|', 'assets', '.', 'fixed'],
 *   splitOrPath: ['netIncome', 'assets.fixed'],
 * }
 * @param {array} paths - with strings
 */
function parsePaths(paths: string[]) {
  const parsed: ParsedPath[] = [];
  for (const p of paths) {
    let res = [''];
    let dotSegment = '';
    let dotSegments = [];
    let parsedPath = [];
    let i = 0;

    while (i < p.length) {
      if (p[i] === '.') {
        dotSegments.push(dotSegment);
        dotSegment = '';
        res = res.concat([p[i], '']);
      } else if (p[i] === '|') {
        dotSegments.push(dotSegment);
        parsedPath.push(dotSegments);
        dotSegment = '';
        dotSegments = [];
        res = res.concat([p[i], '']);
      } else {
        dotSegment += p[i];
        res[res.length - 1] += p[i];
        if (i === p.length - 1) {
          dotSegments.push(dotSegment);
          parsedPath.push(dotSegments);
        }
      }
      i++;
    }

    if (res[0].length) {
      parsed.push({
        name: p,
        parsedPath,
        splitAllPath: res,
        splitOrPath: res.join('').split('|'),
      });
    }
  }

  return parsed;
}

export default parsePaths;

interface ParsedPath {
  name: string;
  parsedPath: string[][];
  splitAllPath: string[];
  splitOrPath: string[];
}
