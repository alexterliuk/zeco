import extractKeyValuePairs from '../extract-key-value-pairs';

describe('keyValuePairs if called with', () => {
  it('{ a: `AA`, b: 7 }, returns [{ key: `a`, value: `AA` }, { key: `b`, value: 7 }]', () => {
    const input = { a: 'AA', b: 7 };
    const result = [
      { key: 'a', value: 'AA' },
      { key: 'b', value: 7 },
    ];
    expect(extractKeyValuePairs(input)).toEqual(result);
  });

  it('({ a: `AA`, b: 7 }, [`a`]), returns [{ key: `b`, value: 7 }]', () => {
    const input = { a: 'AA', b: 7 };
    const result = [{ key: 'b', value: 7 }];
    expect(extractKeyValuePairs(input, ['a'])).toEqual(result);
  });

  it('not appropriate data - null, returns []', () => {
    // @ts-ignore
    expect(extractKeyValuePairs(null)).toEqual([]);
  });
});
