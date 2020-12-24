import React, { useState } from 'react';
import styled from 'styled-components';
import useLangContext from '../hooks/use-lang-context';
import { Language } from '../translations/translations';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;

  @media (max-width: 372px) {
    margin-left: 10px;
  }
`;

const LangBtn = styled.button`
  font-family: Roboto;
  font-size: 13px;
  line-height: 0.8;
  padding: 4px 8px;
  border: 1px solid white;
  border-radius: 4px;
  outline: none;
  color: white;
  background-color: transparent;
  cursor: pointer;

  &.active {
    background-color: white;
    color: unset;
  }

  @media (max-width: 480px) {
    padding: 3px 6px;
  }
`;

const SwitchLanguage = () => {
  const [lang, setLang] = useState(useLangContext.getLang());

  const updateLang = (clickedLang: Language) => {
    if (clickedLang !== lang) {
      setLang(() => clickedLang);
      setTimeout(() => {
        useLangContext.updateDependentStates(clickedLang);
      }, 0);
    }
  };

  return (
    <Container>
      <LangBtn
        onClick={() => updateLang('ua')}
        className={lang === 'ua' ? 'active' : ''}
      >
        UA
      </LangBtn>
      <LangBtn
        onClick={() => updateLang('en')}
        className={lang === 'en' ? 'active' : ''}
      >
        EN
      </LangBtn>
    </Container>
  );
};

export default SwitchLanguage;
