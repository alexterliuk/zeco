import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import ProfitPresentation from '../components/profit-presentation';
import FinResPresentation from '../components/fin-res-presentation';
import { BarCharts } from '../components/bar-charts';
import profitsAllStateCompaniesChartSpec from '../data/profits-all-state-companies-chart-spec';

const ImageContainer = styled.div`
  max-width: 300px;
  margin-bottom: 1.45rem;
`;

const IndexPage = () => (
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

export default IndexPage;
