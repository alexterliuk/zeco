import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import HomeImage from '../components/home-image';
import SEO from '../components/seo';
import ProfitPresentation from '../components/profit-presentation';
import FinResPresentation from '../components/fin-res-presentation';
import { BarCharts } from '../components/bar-charts';
import profitsAllStateCompaniesChartSpec from '../data/profits-all-state-companies-chart-spec';
import useLangContext from '../hooks/use-lang-context';
import { translateCommon } from '../translations/translate';
import delayAndCall from '../helpers/delay-and-call';

const Title = styled.h1`
  margin-top: 3.45rem;
`;

const ImageContainer = styled.div`
  max-width: 840px;
  margin-bottom: 1.45rem;
`;

let initLoad = true;

const IndexPage = () => {
  const [NOT_USED, triggerTranslating] = useState('');

  useEffect(() => {
    const updater = useLangContext.on('Index Page', triggerTranslating);
    return () => {
      useLangContext.off(updater);
    };
  }, []);

  // prevent possible default lang page flash before selected lang is applied
  if (initLoad) {
    delayAndCall(() => {
      initLoad = false;
      triggerTranslating(() => useLangContext.getLang());
    }, 0);
  }

  const title = translateCommon('indexPageTitle');

  return (
    <Layout>
      <SEO title={title} />
      <ImageContainer>
        <HomeImage />
      </ImageContainer>
      {initLoad ? null : (
        <>
          <Title>{title}</Title>
          <p>{translateCommon('indexPage1')}</p>
          <p>{translateCommon('indexPage2')}</p>
          <BarCharts initChartSpec={profitsAllStateCompaniesChartSpec} />
          <ProfitPresentation />
          <p>{translateCommon('indexPage3')}</p>
          <p>{translateCommon('indexPage4')}</p>
          <FinResPresentation />
        </>
      )}
    </Layout>
  );
};

export default IndexPage;
