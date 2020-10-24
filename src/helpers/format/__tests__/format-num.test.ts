import formatNum, { formats } from '../format-num';

describe('formatNum is called with', () => {
  it('no `gapN` option, and `gap3` option is applied as default', () => {
    expect(formatNum(1234567, [])).toBe('1 234 567');
  });

  it('`gap2` option, and it is applied', () => {
    expect(formatNum(123456789, ['gap2'])).toBe('1 23 45 67 89');
  });

  it('doo function as an option, and this function mutates returned string', () => {
    formats.dummy = {
      doo: (a: any, b: any, c: any) => a + '-A-',
    };
    expect(formatNum(123456789, ['dummy'])).toBe('123-A-456-A-789-A-');
    delete formats.dummy;
  });

  it('floating number, and `.` is replaced with `,`', () => {
    expect(formatNum(9.5, [])).toBe('9,5');
  });

  it('floating number and `dot` option, and `.` is preserved as `.`', () => {
    expect(formatNum(9.5, ['dot'])).toBe('9.5');
  });

  it('`percent` as an option, and returned string ends with `%`', () => {
    expect(formatNum(9581, ['percent'])).toBe('9 581%');
  });

  it('`usd` as an option, and returned string starts with `$`', () => {
    expect(formatNum(9581, ['usd'])).toBe('$9 581');
  });

  it('`uah` as an option, and returned string starts with `₴`', () => {
    expect(formatNum(9581, ['uah'])).toBe('₴9 581');
  });
});
