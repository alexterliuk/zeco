import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './styled-elements';
import profitsOfAllStateCompaniesOfUkr, {
  Profit,
  profitsIndicesSets,
} from '../data/profits-all-state-companies';
import {
  translateCommon,
  translateTimePeriod,
} from '../translations/translate';
import { formatNum } from '../helpers/format';

const PresentationContainer = styled.section`
  margin: 10px 0;
`;

const ProfitsContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const ProfitBlockContainer = styled.div`
  flex: 1;
`;

const ProfitFigTitle = styled.h3`
  text-align: center;
`;

const ProfitFigName = styled.p`
  margin-bottom: 1rem;
  text-align: center;
`;

const ProfitFig = styled.p`
  font-size: 70px;
  line-height: 1;
  font-variant-numeric: lining-nums;
  text-align: center;

  @media (max-width: 568px) {
    font-size: 40px;
  }
`;

const ToggleProfitFigButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BlnHryvnias = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

// by default show profits pair: 2019 2 qr. - 2020 2 qr.
// other ones show/hide when user clicks button
const ProfitPresentation = ({
  profitsPairs = makeProfitsPairs(profitsIndicesSets),
}) => {
  const [profitsPairsStore, toggleProfitsPairs] = useState({
    show: false,
    elems: getProfitsContainers(profitsPairs.slice(1)),
  });

  const handleClick = () => {
    toggleProfitsPairs({
      show: !profitsPairsStore.show,
      elems: profitsPairsStore.elems,
    });
  };

  return (
    <PresentationContainer>
      {getProfitsContainers(profitsPairs.slice(0, 1))}
      <BlnHryvnias>{translateCommon('blnHryvnias')}</BlnHryvnias>
      <ToggleProfitFigButtonContainer>
        <Button onClick={() => handleClick()}>
          {translateCommon(profitsPairsStore.show ? 'hide' : 'showMore')}
        </Button>
      </ToggleProfitFigButtonContainer>
      {profitsPairsStore.show ? profitsPairsStore.elems : null}
    </PresentationContainer>
  );
};

const ProfitBlock = ({ data }: { data: Profit }) => {
  const { timePeriod, key, value } = data;
  const color = value > 0 ? 'green' : value < 0 ? 'red' : 'inherit';
  return (
    <>
      <ProfitFigTitle>
        {timePeriod.year}{' '}
        {timePeriod.quarter !== undefined
          ? translateTimePeriod(`${timePeriod.quarter + 1}q`)
          : ''}
      </ProfitFigTitle>
      <ProfitFigName style={{ color }}>{translateCommon(key)}</ProfitFigName>
      <ProfitFig style={{ color }}>
        {formatNum(+(value / 1000000).toFixed(3), [])}
      </ProfitFig>
    </>
  );
};

/**
 * @param {array} profitsPairs - with {profitsPair: [Profit, Profit]} objects
 * @param {string} [order] - 'reverse'|void (which of Profits show first, second)
 */
function getProfitsContainers(profitsPairs: ProfitsPair[], order?: 'reverse') {
  return profitsPairs.map((item, i) => {
    const reverseOrder = order === 'reverse';
    return (
      <ProfitsContainer key={`p${i}`}>
        <ProfitBlockContainer style={{ marginRight: 10 }}>
          <ProfitBlock data={item.profitsPair[reverseOrder ? 1 : 0]} />
        </ProfitBlockContainer>
        <ProfitBlockContainer>
          <ProfitBlock data={item.profitsPair[reverseOrder ? 0 : 1]} />
        </ProfitBlockContainer>
      </ProfitsContainer>
    );
  });
}

/**
 * @param {array} indicesSets - array with arrays (each with two numbers)
 */
function makeProfitsPairs(indicesSets: number[][]) {
  const profits = profitsOfAllStateCompaniesOfUkr;
  return indicesSets.reduce((acc: ProfitsPair[], set) => {
    if (set[1] !== undefined) {
      acc.push({
        profitsPair: [profits[set[0]], profits[set[1]]],
      });
    }
    return acc;
  }, []);
}

interface ProfitsPair {
  profitsPair: Profit[];
}

export default ProfitPresentation;
