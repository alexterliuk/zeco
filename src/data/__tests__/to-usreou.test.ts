import { toUsreou } from '../update-company-profile';

describe('toUsreou', () => {
  it('returns false if called with not valid usreou (must be number (of <= 8 digits) OR string of numbers (of <= length 8))', () => {
    expect(toUsreou(Infinity)).toBe(false);
    expect(toUsreou(NaN)).toBe(false);
    expect(toUsreou('1548526584878')).toBe(false);
    expect(toUsreou(1548526584878)).toBe(false);
    expect(toUsreou('1548,52')).toBe(false);
    expect(toUsreou('1548b52')).toBe(false);
    expect(toUsreou('-154852')).toBe(false);
    expect(toUsreou('+154852')).toBe(false);
  });

  it('returns `00154698` if called with 154698 || `154698`; `56798541` if called with same number or string; `00000003` if called with 3 || `3`', () => {
    expect(toUsreou(154698)).toBe('00154698');
    expect(toUsreou('154698')).toBe('00154698');
    expect(toUsreou(56798541)).toBe('56798541');
    expect(toUsreou('56798541')).toBe('56798541');
    expect(toUsreou(3)).toBe('00000003');
    expect(toUsreou('3')).toBe('00000003');
  });
});
