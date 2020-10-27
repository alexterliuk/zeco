import deBangAndMemo from '../de-bang-and-memo';

describe('deBangAndMemo if called with', () => {
  it('([`a`, `b`], `foo`), returns { foo: { arr: [`a`, `b`], startsWithBang: { a: false, b: false } }', () => {
    const result = {
      foo: {
        arr: ['a', 'b'],
        startsWithBang: { a: false, b: false },
      },
    };
    expect(deBangAndMemo(['a', 'b'], 'foo')).toEqual(result);
  });

  it('([`!a`, `b`], `foo`), removes `!` from `!a` and returns { foo: { arr: [`a`, `b`], startsWithBang: { a: true, b: false } }', () => {
    const result = {
      foo: {
        arr: ['a', 'b'],
        startsWithBang: { a: true, b: false },
      },
    };
    expect(deBangAndMemo(['!a', 'b'], 'foo')).toEqual(result);
  });

  it('no second argument, returns { deBanged: { arr: [...], startsWithBang: {...} }', () => {
    const result = {
      deBanged: {
        arr: [],
        startsWithBang: {},
      },
    };
    expect(deBangAndMemo([])).toEqual(result);
  });
});
