import prependKeysToPathsIfNeeded from '../prepend-keys-to-paths-if-needed';

describe('prependKeysToPathsIfNeeded if called with', () => {
  const prepend = prependKeysToPathsIfNeeded;

  it('([`netProfit`], { netProfit: 14 }) returns [[[`netProfit`]]]', () => {
    const call = prepend(['netProfit'], { netProfit: 14 });
    const result = [[['netProfit']]];
    expect(call).toEqual(result);
  });

  it('([`netProfit`, `netIncome`], { netProfit: 14, netIncome: false }) returns [ [[`netProfit`]], [[`netIncome`]] ]', () => {
    const call = prepend(['netProfit', 'netIncome'], {
      netProfit: 14,
      netIncome: false,
    });
    const result = [[['netProfit']], [['netIncome']]];
    expect(call).toEqual(result);
  });

  it('([`financials.netProfit`, `netIncome`], { financials: { netProfit: 14, netIncome: false } }) returns [ [[`financials`, `netProfit`]], [[`financials`, `netIncome`]] ]', () => {
    const call = prepend(['financials.netProfit', 'netIncome'], {
      financials: { netProfit: 14, netIncome: false },
    });
    const result = [
      [['financials', 'netProfit']],
      [['financials', 'netIncome']],
    ];
    expect(call).toEqual(result);
  });

  it('([`foo.doo.zoo`], { foo: { doo: { zoo: false } } }) returns [ [[`foo`, `doo`, `zoo`]] ]', () => {
    const call = prepend([`foo.doo.zoo`], { foo: { doo: { zoo: false } } });
    const result = [[['foo', 'doo', 'zoo']]];
    expect(call).toEqual(result);
  });

  it('([`foo.doo`], { foo: { doo: { zoo: false } } }) returns [ [[`foo`, `doo`]] ]', () => {
    const call = prepend([`foo.doo`], { foo: { doo: { zoo: false } } });
    const result = [[['foo', 'doo']]];
    expect(call).toEqual(result);
  });

  it('([`doo.zoo`], { foo: { doo: { zoo: false } } }) returns [ [[`foo`, `doo`, `zoo`]] ]', () => {
    const call = prepend([`doo.zoo`], { foo: { doo: { zoo: false } } });
    const result = [[['foo', 'doo', 'zoo']]];
    expect(call).toEqual(result);
  });

  it('([`doo`], { foo: { doo: { zoo: false } } }) returns [ [[`foo`, `doo`]] ]', () => {
    const call = prepend([`doo`], { foo: { doo: { zoo: false } } });
    const result = [[['foo', 'doo']]];
    expect(call).toEqual(result);
  });
});
