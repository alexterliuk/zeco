const getPositiveIntegerOrZero = (v: any) =>
  typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;

const isNumber = (n: any) =>
  typeof n === 'number' && Number.isFinite(n) && !Number.isNaN(n);

const isFunction = (...maybeFuncs: any[]) => {
  const result = maybeFuncs.reduce((acc, f) => {
    acc.push(typeof f === 'function' ? f : false);
    return acc;
  }, []);

  return !result.length ? false : result.length === 1 ? result[0] : result;
};

export { getPositiveIntegerOrZero, isNumber, isFunction };
