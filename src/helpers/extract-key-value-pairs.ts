/**
 * Extract entries from object and convert them to key-value pairs.
 * @param {object} data
 * @param {array} [ignoreKeys] - collection with keys inside
 * @returns [{ key: string, value: any }, ...]
 */
function extractKeyValuePairs(
  data: KeyValuePairsObj,
  ignoreKeys: string[] = []
): KeyValuePairs {
  const keys = Object.keys(data);
  const ignoreThis = ignoreKeys.reduce(
    (acc: IgnoreKeys, k) => ((acc[k] = true), acc),
    {}
  );
  const result = [];
  let key = keys.pop();

  while (key) {
    if (!ignoreThis[key]) {
      result.push({ key, value: data[key] });
    }
    key = keys.pop();
  }

  return result;
}

type IgnoreKeys = {
  [key: string]: boolean;
};
type KeyValuePairsObj = {
  [key: string]: any;
};

export type KeyValuePairs = Array<KeyValuePair>;
export type KeyValuePair = { key: string; value: any };
export default extractKeyValuePairs;
