import { getPositiveIntegerOrZero, isFunction } from '../value-checker';

describe('getPositiveIntegerOrZero', () => {
  it('returns 0 if called with -4 || -4.73 || 0 || `a` || null || {} || /ff/ || [] || Infinity || NaN || () => {}', () => {
    const args = [
      -4,
      -4.73,
      0,
      `a`,
      null,
      {},
      /ff/,
      [],
      Infinity,
      NaN,
      () => {},
    ];
    const results = args.map(v => getPositiveIntegerOrZero(v));
    expect(results).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('returns 4 if called with 4', () => {
    expect(getPositiveIntegerOrZero(4)).toBe(4);
  });

  it('returns 4 if called with 4.13', () => {
    expect(getPositiveIntegerOrZero(4.13)).toBe(4);
  });
});

describe('isFunction', () => {
  it('returns false if called with -4 || -4.73 || 0 || `a` || null || {} || /ff/ || [] || Infinity || NaN', () => {
    const args = [-4, -4.73, 0, `a`, null, {}, /ff/, [], Infinity, NaN];
    const results = args.map(v => isFunction(v));
    expect(results).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  });

  it('returns function if called with function as an argument', () => {
    const func = () => {};
    expect(isFunction(func)).toBe(func);
  });

  it('returns [function, function] if called with functions', () => {
    const func1 = () => {};
    const func2 = () => {};
    expect(isFunction(func1, func2)).toEqual([func1, func2]);
  });
});
