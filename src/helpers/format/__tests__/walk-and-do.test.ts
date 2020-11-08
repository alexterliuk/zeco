import walkAndDo from '../walk-and-do';

// (1) - calling with not appropriate string (1st argument)
describe("walkAndDo returns { composed: '', split: [] }", () => {
  const res = {
    composed: '',
    split: [],
  };

  it('if called with empty string', () => {
    expect(walkAndDo('')).toEqual(res);
  });

  it('if called with no arguments', () => {
    // @ts-ignore
    expect(walkAndDo()).toEqual(res);
  });

  it('if called with smth other than string and no options', () => {
    // @ts-ignore
    expect(walkAndDo({})).toEqual(res);
  });
});

// (2) - calling with non empty string and different options
describe('walkAndDo called with non-empty string', () => {
  it('and {} as options, and it adds a space after each char', () => {
    const res = {
      composed: 'a b c ',
      split: ['a ', 'b ', 'c '],
    };

    expect(walkAndDo('abc', {})).toEqual(res);
  });

  it('and { rtl: true } as options, and it adds a space before each char', () => {
    const res = {
      composed: ' a b c',
      split: [' a', ' b', ' c'],
    };

    expect(walkAndDo('abc', { rtl: true })).toEqual(res);
  });

  it('and { each: 4 } as options, and it adds a space after each 4th char', () => {
    const res = {
      composed: 'abcd ef',
      split: ['abcd ', 'ef'],
    };

    expect(walkAndDo('abcdef', { each: 4 })).toEqual(res);
  });

  it('and { stop: 7 } as options, and walkAndDo stops after processing 7th char and returns string', () => {
    const res = {
      composed: 's e r e n d i ',
      split: ['s ', 'e ', 'r ', 'e ', 'n ', 'd ', 'i '],
    };

    expect(walkAndDo('serendipity', { stop: 7 })).toEqual(res);

    res.composed = 'v e h i c l e ';
    res.split = ['v ', 'e ', 'h ', 'i ', 'c ', 'l ', 'e '];
    expect(walkAndDo('vehicle', { stop: 7 })).toEqual(res);
  });

  it("and { doo: (a, b, c) => a + '--' } as options, and this doo is called and affects the walkAndDo's returned string", () => {
    const res = {
      composed: 't--a--p--',
      split: ['t--', 'a--', 'p--'],
    };

    const doo = (a: any, b: any, c: any): string => a + '--';
    // @ts-ignore
    expect(walkAndDo('tap', { doo })).toEqual(res);
  });

  it("and { doo: (a, b, c) => a } as options, and this doo is called and nothing is mutated in walkAndDo's returned string", () => {
    const res = {
      composed: 'tap',
      split: ['t', 'a', 'p'],
    };

    const doo = (a: any, b: any, c: any): string => a;
    // @ts-ignore
    expect(walkAndDo('tap', { doo })).toEqual(res);
  });
});
