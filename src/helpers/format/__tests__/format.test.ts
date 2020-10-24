import format from '../format';

describe('format', () => {
  it('returns numOrStr if numOrStr neither string, nor number', () => {
    let numOrStr: any = {};
    let ret = format(numOrStr);
    expect(ret).toBe(numOrStr);

    numOrStr = null;
    ret = format(numOrStr);
    expect(ret).toBe(null);

    numOrStr = 56854;
    ret = format(numOrStr);
    expect(ret).not.toBe(numOrStr);
  });
});
