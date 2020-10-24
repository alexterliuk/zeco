import launchFormattingNum from '../launch-formatting-num';

describe('launchFormattingNum', () => {
  it('adds a space after each number if called without formats', () => {
    expect(launchFormattingNum(1234, {})).toBe('1 2 3 4');
  });

  it('does not add a space before and after `.` if called for floating number', () => {
    expect(launchFormattingNum(12.34, {})).toBe('1 2,3 4');
  });

  it('preserves `-` at starts of the string if called for negative number', () => {
    expect(launchFormattingNum(-1234, {})).toBe('-1 2 3 4');
  });
});
