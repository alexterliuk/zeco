import zecoConfig from '../../../config/zeco-config';

/**
 * Find formats applicable for a value (name represents it)
 * with which format function will be called.
 * @param {string} name
 */
function getFinFormatsForValue(name: any): string[] {
  if (typeof name !== 'string') return [];

  const finFormatConfig = zecoConfig.getItem(['financials', 'format']);
  const finFormatConfigKeys = Object.keys(finFormatConfig);

  return finFormatConfigKeys.reduce((acc: string[], k) => {
    const opt = finFormatConfig[k];
    if (opt.includes(name)) {
      acc.push(k);
    }
    return acc;
  }, []);
}

export default getFinFormatsForValue;
