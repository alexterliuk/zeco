import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { translateCommon } from '../translations/translate';
import CompaniesAllDataSection from '../components/companies-all-data-section';

const LinkWrapper = styled.div`
  display: flex;
`;

const LinkWrapperChild = styled.div`
  margin-left: auto;
`;

const CompaniesAllData = () => {
  return (
    <Layout size={3}>
      <SEO title="Show all companies" />
      <LinkWrapper>
        <LinkWrapperChild>
          <Link to="/">{translateCommon('backToHomepage')}</Link>
        </LinkWrapperChild>
      </LinkWrapper>
      <h1>{translateCommon('allCompanies')}</h1>
      <p>
        {translateCommon('clickOnRowForView')}{' '}
        {translateCommon('dataGivenInMMHryvnias')}
      </p>
      <CompaniesAllDataSection />
    </Layout>
  );
};

export default CompaniesAllData;
