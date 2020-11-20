import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import ProfitPresentation from '../components/profit-presentation';
import FinResPresentation from '../components/fin-res-presentation';
import { BarCharts } from '../components/bar-charts';
import profitsAllStateCompaniesChartData from '../data/profits-all-state-companies-chart-data';

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
    <Link to="/page-2/">Go to page 2</Link> <br />
    {/*<Link to="/companies-all-data/">Show All Companies</Link> <br />*/}
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    <BarCharts initChartSpec={profitsAllStateCompaniesChartData} />
  </Layout>
);

export default IndexPage;
