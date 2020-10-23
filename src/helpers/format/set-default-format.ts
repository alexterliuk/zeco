/**
 * If given data is absent in formats, add it.
 * @param {object} formats
 * @param {string} key
 * @param {any} val
 */
function setDefaultFormat(
  formats: { [k: string]: string },
  key: string,
  val: any
): void {
  if (!formats.hasOwnProperty(key)) formats[key] = val;
}

export default setDefaultFormat;
