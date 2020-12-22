import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import ProfitPresentation from '../components/profit-presentation';
import FinResPresentation from '../components/fin-res-presentation';
import { BarCharts } from '../components/bar-charts';
import profitsAllStateCompaniesChartSpec from '../data/profits-all-state-companies-chart-spec';
import useLangContext from '../hooks/use-lang-context';

const ImageContainer = styled.div`
  max-width: 300px;
  margin-bottom: 1.45rem;
`;

const IndexPage = () => {
  const [NOT_USED, triggerTranslating] = useState('');

  useEffect(() => {
    const translatingUpdater = {
      id: 'Index Page',
      triggerTranslating: () => {
        triggerTranslating(() => useLangContext.getLang());
      },
    };
    useLangContext.subscribe(translatingUpdater);
    return () => {
      useLangContext.unsubscribe(translatingUpdater);
    };
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ImageContainer>
        <Image />
      </ImageContainer>
      <ProfitPresentation />
      <FinResPresentation />
      <BarCharts initChartSpec={profitsAllStateCompaniesChartSpec} />
    </Layout>
  );
};

export default IndexPage;
