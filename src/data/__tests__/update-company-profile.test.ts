import buildCompanyProfile from '../build-company-profile';
import updateCompanyProfile from '../update-company-profile';

describe('updateCompanyProfile', () => {
  const nautilus = buildCompanyProfile('nautilus', 'naut', 123);

  it('updates company profile if called with (compProfile, { colNames: [`txt`, `2016`, `2017`], profitGrowth: [`txt`, `39.3%`, `-3.8%`], netIncome: [`txt`, `2 181 513`, `5 021 307`] })', () => {
    const data = {
      colNames: ['UA name', '2016', '2017'],
      profitGrowth: ['UA name', '39.3%', '-3.8%'],
      netIncome: ['UA name', '2 181 513', '5 021 307'],
    };

    // placed in if to avoid TS complaints of nautilus to be possibly undefined
    if (nautilus) {
      updateCompanyProfile(nautilus, [data]);
      expect(nautilus.statements[2016].financials.profitGrowth.year).toBe(
        '39.3%'
      );
      expect(nautilus.statements[2017].financials.profitGrowth.year).toBe(
        '-3.8%'
      );
      expect(nautilus.statements[2016].financials.netIncome.year).toBe(2181513);
      expect(nautilus.statements[2017].financials.netIncome.year).toBe(5021307);
    }
  });

  it('updates company profile if called like in prev example but with numbers instead of stringified numbers (colNames must be numbers, so they left as before)', () => {
    const data = {
      colNames: ['UA name', '2016', '2017'],
      profitGrowth: ['UA name', '39.3%', '-3.8%'],
      netIncome: ['UA name', 2181513, 5021307],
    };

    if (nautilus) {
      // @ts-ignore
      updateCompanyProfile(nautilus, [data]);
      expect(nautilus.statements[2016].financials.profitGrowth.year).toBe(
        '39.3%'
      );
      expect(nautilus.statements[2017].financials.profitGrowth.year).toBe(
        '-3.8%'
      );
      expect(nautilus.statements[2016].financials.netIncome.year).toBe(2181513);
      expect(nautilus.statements[2017].financials.netIncome.year).toBe(5021307);
    }
  });

  it('adds `INVALID` as value if instead of number or stringified number is updated with NaN or Infinity', () => {
    const data = {
      colNames: ['UA name', '2016', '2017'],
      netIncome: ['UA name', NaN, Infinity],
    };

    if (nautilus) {
      // @ts-ignore
      updateCompanyProfile(nautilus, [data]);
      expect(nautilus.statements[2016].financials.netIncome.year).toBe(
        'INVALID'
      );
      expect(nautilus.statements[2017].financials.netIncome.year).toBe(
        'INVALID'
      );
    }
  });

  it("doesn't add unknown data to company profile", () => {
    const data = {
      colNames: ['UA name', '2016', '2017'],
      profitGrowth: ['UA name', '39.3%', '-3.8%'],
      netBla: ['UA name', '1 513', '1 307'],
    };

    if (nautilus) {
      updateCompanyProfile(nautilus, [data]);
      // @ts-ignore
      expect(nautilus.statements[2016].financials.netBla).toBe(undefined);
      // @ts-ignore
      expect(nautilus.statements[2016].assets.netBla).toBe(undefined);
      // @ts-ignore
      expect(nautilus.statements[2016].netBla).toBe(undefined);
    }
  });

  it('instead of year adds data to quarters if called with such format: `2016 I`, `2016 II`, `2016 III`, `2016 IV`', () => {
    const data = {
      colNames: ['UA name', '2016 I', '2017 II', '2018 III', '2018 IV'],
      profitGrowth: ['UA name', '39.3%', '-3.8%', '74%', '53%'],
    };

    const tower = buildCompanyProfile('nautilus', 'naut', 123);
    if (tower) {
      // @ts-ignore
      updateCompanyProfile(tower, [data]);
      expect(tower.statements[2016].financials.profitGrowth.year).toBe(false);
      expect(tower.statements[2017].financials.profitGrowth.year).toBe(false);
      expect(tower.statements[2018].financials.profitGrowth.year).toBe(false);
      expect(tower.statements[2016].financials.profitGrowth.quarters[0]).toBe(
        '39.3%'
      );
      expect(tower.statements[2017].financials.profitGrowth.quarters[1]).toBe(
        '-3.8%'
      );
      expect(tower.statements[2018].financials.profitGrowth.quarters[2]).toBe(
        '74%'
      );
      expect(tower.statements[2018].financials.profitGrowth.quarters[3]).toBe(
        '53%'
      );
    }
  });
});
