import pickData from '../pick-data';

describe('pickData if called with', () => {
  it('{ a: 1, b: 4 }, returns undefined', () => {
    const input = { a: 1, b: 4 };
    expect(pickData(input)).toBe(undefined);
  });

  it('({ a: 1, b: 4 }, []), returns undefined', () => {
    const input = { a: 1, b: 4 };
    expect(pickData(input, [])).toBe(undefined);
  });

  it('({ a: 1, b: 4 }, [`a`]), returns 1', () => {
    const input = { a: 1, b: 4 };
    expect(pickData(input, ['a'])).toBe(1);
  });

  it('({ a: { b: { c: 7 }}}, [`a`, `b`, `c`]), returns 7', () => {
    const input = { a: { b: { c: 7 } } };
    expect(pickData(input, ['a', 'b', 'c'])).toBe(7);
  });

  it('({ a: { b: { c: 7 }}}, [`a`, `b`]), returns { c: 7 }', () => {
    const input = { a: { b: { c: 7 } } };
    expect(pickData(input, ['a', 'b'])).toEqual({ c: 7 });
  });

  it('({ a: { b: { c: 7 }}}, [`a`, `c`]), returns undefined', () => {
    const input = { a: { b: { c: 7 } } };
    expect(pickData(input, ['a', 'c'])).toBe(undefined);
  });

  it('not appropriate data - null, returns undefined', () => {
    // @ts-ignore
    expect(pickData(null, ['a'])).toBe(undefined);
  });
});
