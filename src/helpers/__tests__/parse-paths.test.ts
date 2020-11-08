import parsePaths from '../parse-paths';

describe('parsePaths successfully parses', () => {
  it('[`netIncome`]', () => {
    const parsed = parsePaths(['netIncome']);
    const result = [
      {
        name: 'netIncome',
        parsedPath: [['netIncome']],
        splitAllPath: ['netIncome'],
        splitOrPath: ['netIncome'],
      },
    ];

    expect(parsed).toEqual(result);
  });

  it('[`netIncome|netProfit`]', () => {
    const parsed = parsePaths(['netIncome|netProfit']);
    const result = [
      {
        name: 'netIncome|netProfit',
        parsedPath: [['netIncome'], ['netProfit']],
        splitAllPath: ['netIncome', '|', 'netProfit'],
        splitOrPath: ['netIncome', 'netProfit'],
      },
    ];

    expect(parsed).toEqual(result);
  });

  it('[`netIncome|assets.fixed`]', () => {
    const parsed = parsePaths(['netIncome|assets.fixed']);
    const result = [
      {
        name: 'netIncome|assets.fixed',
        parsedPath: [['netIncome'], ['assets', 'fixed']],
        splitAllPath: ['netIncome', '|', 'assets', '.', 'fixed'],
        splitOrPath: ['netIncome', 'assets.fixed'],
      },
    ];

    expect(parsed).toEqual(result);
  });

  it('[`netIncome|assets.fixed`, `profitGrowth`, `financials.netLoss`, `assets.totalValue|assets.current`]', () => {
    const parsed = parsePaths([
      'netIncome|assets.fixed',
      'profitGrowth',
      'financials.netLoss',
      'assets.totalValue|assets.current',
    ]);
    const result = [
      {
        name: 'netIncome|assets.fixed',
        parsedPath: [['netIncome'], ['assets', 'fixed']],
        splitAllPath: ['netIncome', '|', 'assets', '.', 'fixed'],
        splitOrPath: ['netIncome', 'assets.fixed'],
      },
      {
        name: 'profitGrowth',
        parsedPath: [['profitGrowth']],
        splitAllPath: ['profitGrowth'],
        splitOrPath: ['profitGrowth'],
      },
      {
        name: 'financials.netLoss',
        parsedPath: [['financials', 'netLoss']],
        splitAllPath: ['financials', '.', 'netLoss'],
        splitOrPath: ['financials.netLoss'],
      },
      {
        name: 'assets.totalValue|assets.current',
        parsedPath: [
          ['assets', 'totalValue'],
          ['assets', 'current'],
        ],
        splitAllPath: [
          'assets',
          '.',
          'totalValue',
          '|',
          'assets',
          '.',
          'current',
        ],
        splitOrPath: ['assets.totalValue', 'assets.current'],
      },
    ];

    expect(parsed).toEqual(result);
  });

  it('[`bla.foo.doo.zoo|sea.ok|dab`]', () => {
    const parsed = parsePaths(['bla.foo.doo.zoo|sea.ok|dab']);
    const result = [
      {
        name: 'bla.foo.doo.zoo|sea.ok|dab',
        parsedPath: [['bla', 'foo', 'doo', 'zoo'], ['sea', 'ok'], ['dab']],
        splitAllPath: [
          'bla',
          '.',
          'foo',
          '.',
          'doo',
          '.',
          'zoo',
          '|',
          'sea',
          '.',
          'ok',
          '|',
          'dab',
        ],
        splitOrPath: ['bla.foo.doo.zoo', 'sea.ok', 'dab'],
      },
    ];

    expect(parsed).toEqual(result);
  });
});
