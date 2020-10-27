import updateObject from '../update-object';

describe('updateObject if called with', () => {
  it('([`a`], `ff`, { a: 100, b: 70 }), updates object -> { a: `ff`, b: 70 }', () => {
    const obj = { a: 100, b: 70 };
    updateObject(['a'], 'ff', obj);
    expect(obj).toEqual({ a: 'ff', b: 70 });
  });

  it('([`z`], `ff`, { a: 100, b: 70 }), does not mutate object', () => {
    const obj = { a: 100, b: 70 };
    updateObject(['z'], 'ff', obj);
    expect(obj).toEqual({ a: 100, b: 70 });
  });

  it('([`a`, `b`], 51, { a: { b: 7 }}), updates object -> { a: { b: 51 }}', () => {
    const obj = { a: { b: 7 } };
    updateObject(['a', 'b'], 51, obj);
    expect(obj).toEqual({ a: { b: 51 } });
  });

  it('([`a`, `b`, `c`], 66, { a: { b: 7 }}), does not mutate object', () => {
    const obj = { a: { b: 7 } };
    updateObject(['a', 'b', 'c'], 66, obj);
    expect(obj).toEqual({ a: { b: 7 } });
  });

  it('not appropriate data - null, returns undefined', () => {
    const obj = null;
    // @ts-ignore
    expect(updateObject(['a', 'b'], 10, obj)).toBe(undefined);
  });
});
