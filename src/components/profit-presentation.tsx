import React, { useState } from 'react';
import styled from 'styled-components';
import profitsOfAllStateCompaniesOfUkr, {
  Profit,
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

const ToggleProfitFigButton = styled.button`
  min-width: 170px;
  padding: 5px 10px;
  cursor: pointer;
`;

const BlnHryvnias = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

// by default show profits pair: 2019 2 qr. - 2020 2 qr.
// other ones show/hide when user clicks button
const ProfitPresentation = ({
  profitsPairs = makeProfitsPairs(0, 1, 2, 3, 4, 5, 5, 6, 6, 7),
}) => {
  const [profitsPairsStore, toggleProfitsPairs] = useState({
    show: false,
    elems: getProfitsContainers(profitsPairs.slice(1), [1, 0]),
  });

  const handleClick = () => {
    toggleProfitsPairs({
      show: !profitsPairsStore.show,
      elems: profitsPairsStore.elems,
    });
  };

  return (
    <PresentationContainer>
      {getProfitsContainers(profitsPairs.slice(0, 1), [1, 0])}
      <BlnHryvnias>{translateCommon('blnHryvnias')}</BlnHryvnias>
      <ToggleProfitFigButtonContainer>
        <ToggleProfitFigButton onClick={() => handleClick()}>
          {translateCommon(profitsPairsStore.show ? 'hide' : 'showMore')}
        </ToggleProfitFigButton>
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
 * @param {array} indices - [num, num] (which of Profits show first, second)
 */
function getProfitsContainers(
  profitsPairs: ProfitsPair[],
  indices: [number, number]
) {
  return profitsPairs.map((item, i) => {
    return (
      <ProfitsContainer key={`p${i}`}>
        <ProfitBlockContainer style={{ marginRight: 10 }}>
          <ProfitBlock data={item.profitsPair[indices[0]]} />
        </ProfitBlockContainer>
        <ProfitBlockContainer>
          <ProfitBlock data={item.profitsPair[indices[1]]} />
        </ProfitBlockContainer>
      </ProfitsContainer>
    );
  });
}

/**
 * @param {array} indices
 */
function makeProfitsPairs(...indices: number[]) {
  return indices.reduce((acc: ProfitsPair[], idx, i) => {
    if (!(i % 2)) {
      const lastIdx = indices[i + 1];
      if (lastIdx !== undefined) {
        acc.push({
          profitsPair: profitsOfAllStateCompaniesOfUkr.slice(idx, lastIdx + 1),
        });
      }
    }
    return acc;
  }, []);
}

interface ProfitsPair {
  profitsPair: Profit[];
}

export default ProfitPresentation;
