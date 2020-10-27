import pickData from './pick-data';

/**
 * Go to given path and update value in object.
 * @param {object} pathSegments - with keys
 * @param {any} val
 * @param {object} obj - obj where to make an update
 */
function updateObject(
  pathSegments: string[],
  val: any,
  obj?: { [key: string]: any }
): void {
  if (val === undefined || typeof obj !== 'object') return;

  const lastPathSegm = pathSegments[pathSegments.length - 1];
  const singleKey = pathSegments.length === 1 && lastPathSegm;

  if (singleKey) {
    if (obj.hasOwnProperty(singleKey)) {
      obj[singleKey] = val;
    }
  } else {
    const picked = pickData(obj, pathSegments.slice(0, -1));
    if (typeof picked === 'object') {
      picked[lastPathSegm] = val;
    }
  }
}

export default updateObject;
