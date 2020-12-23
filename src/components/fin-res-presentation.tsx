import React, { useState } from 'react';
import styled from 'styled-components';
import BoxSection from './box-section';
import CompanyPanelSection from './company-panel-section';
import delayAndCall from '../helpers/delay-and-call';
import { ParsedTimePeriod } from '../data/update-company-profile';
import { translateTimePeriod } from '../translations/translate';
import { Button } from './styled-elements';

const Container = styled.section`
  margin: 10px 0;
  padding: 5px 0;
`;

const ToggleBoxSectButtonContainer = styled.div`
  max-width: 762px;
  margin: 10px auto;
`;

const FinResPresentation = () => {
  const [companyId, setCompanyId] = useState('');
  const [companyPanelOpacity, setCompanyPanelOpacity] = useState(1);
  const [timePeriod, setTimePeriod] = useState<ParsedTimePeriod>({
    year: 2020,
    quarter: 1,
  });
  const [toggleBoxSectBtnActive, setToggleBoxSectBtnActive] = useState(
    ['active'].concat(Array(finResPresentationTimePeriods.length - 1).fill(''))
  );
  const delay = 150;
  const update = (id: string) => {
    setCompanyId(() => id);
  };
  const preUpdate = () => {
    setCompanyPanelOpacity(() => 0);
  };
  const postUpdate = () => {
    setCompanyPanelOpacity(() => 1);
  };

  const updateCompanyPanel = (id: string) => {
    if (companyId !== id) {
      delayAndCall(update.bind(null, id), delay, preUpdate, postUpdate);
    }
  };

  const handleTimePeriodClick = (timePeriod: ParsedTimePeriod, i: number) => {
    setToggleBoxSectBtnActive(() =>
      finResPresentationTimePeriods.map((_, y) => (i === y ? 'active' : ''))
    );
    setTimePeriod(() => timePeriod);
  };

  return (
    <Container>
      <ToggleBoxSectButtonContainer>
        {finResPresentationTimePeriods.map((period, i) => {
          const { year, quarter } = period;
          const prd = quarter !== undefined ? { year, quarter } : { year };

          return (
            <Button
              key={`${period.year}${i}`}
              onClick={() => handleTimePeriodClick(prd, i)}
              className={toggleBoxSectBtnActive[i]}
            >
              {year}{' '}
              {quarter !== undefined
                ? translateTimePeriod(`${quarter + 1}q`)
                : ''}
            </Button>
          );
        })}
      </ToggleBoxSectButtonContainer>

      <BoxSection
        updateCompanyPanel={updateCompanyPanel}
        timePeriod={timePeriod}
      />
      <CompanyPanelSection
        id={companyId}
        companyPanelOpacity={companyPanelOpacity}
        timePeriod={timePeriod}
      />
    </Container>
  );
};

const finResPresentationTimePeriods = [
  { year: 2020, quarter: 1 },
  { year: 2020, quarter: 0 },
  { year: 2019 },
  { year: 2018 },
  { year: 2017 },
  { year: 2016 },
];

export default FinResPresentation;
