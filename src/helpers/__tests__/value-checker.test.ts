import {
  getPositiveIntegerOrZero,
  isNumber,
  isFunction,
  isStringifiedNumberEndingWithPercent,
} from '../value-checker';

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
    expect(results).toEqual(Array(10).fill(false));
  });

  it('returns function if called with function as an argument', () => {
    const func = () => {};
    expect(isFunction(func)).toBe(func);
  });

  it('returns [function, function, ...] if called with functions', () => {
    const func1 = () => {};
    const func2 = () => {};
    expect(isFunction(func1, func2)).toEqual([func1, func2]);
  });
});

describe('isStringifiedNumberEndingWithPercent', () => {
  it('returns true if value is a stringified number (integer or float, negative or positive) ending with `%`', () => {
    const args = [
      '1%',
      '-1%',
      '1.1%',
      '-1.1%',
      '10.1%',
      '-10.1%',
      '10.25%',
      '-10.25%',
    ];
    const results = args.map(v => isStringifiedNumberEndingWithPercent(v));
    expect(results).toEqual(Array(8).fill(true));
  });

  it('returns false if value is not a stringified number ending with `%`', () => {
    const args = ['-', '.-', '.-%', '.1', '.1%', '-.1%', '1.%', '-1.%'];
    const results = args.map(v => isStringifiedNumberEndingWithPercent(v));
    expect(results).toEqual(Array(8).fill(false));
  });
});
