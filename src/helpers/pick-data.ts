/**
 * Pick a value in object from a given path.
 * @param {object} obj
 * @param {array} pathSegments - with keys
 */
function pickData(
  obj: { [key: string]: any },
  pathSegments: string[] = []
): any {
  let data = obj;
  let i = 0;

  while (data) {
    const key = pathSegments[i];
    if (typeof data !== 'object' || !data.hasOwnProperty(key)) {
      break;
    }
    data = data[key];
    i++;
  }

  if (obj !== data && i === pathSegments.length) {
    return data;
  }
}

export default pickData;
