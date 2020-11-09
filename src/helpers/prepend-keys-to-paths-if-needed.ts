import parsePaths from './parse-paths';
import pickData from './pick-data';

/**
 *
 * @param {array} paths - with strings
 * @param {object} obj - where to check if data exists by paths
 * @param {array} keys - with strings
 */
function prependKeysToPathsIfNeeded(
  paths: string[],
  obj: { [key: string]: any },
  keys?: string[]
): string[][][] | void {
  if (!paths) return;
  const objKeys = keys || Object.keys(obj);

  const pathsSegmentsSets: string[][][] = [];
  const parsedPaths = parsePaths(paths);
  for (const parsed of parsedPaths) {
    const set: string[][] = [];
    pathsSegmentsSets.push(set);

    for (const pathSegments of parsed.parsedPath) {
      const data = pickData(obj, pathSegments);

      if (data !== undefined) {
        set.push(pathSegments);
        break;
      }

      for (const key of objKeys) {
        const keyPathSegments = [key].concat(pathSegments);
        const data = pickData(obj, keyPathSegments);

        if (data !== undefined) {
          set.push(keyPathSegments);
          break;
        }
      }
    }
  }

  return pathsSegmentsSets;
}

export default prependKeysToPathsIfNeeded;
