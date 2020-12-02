import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { translateCommon } from '../translations/translate';
import LinkToHomepage from '../components/link-to-homepage';
import CompaniesAllDataSection from '../components/companies-all-data-section';

const CompaniesAllData = () => (
  <Layout size={3}>
    <SEO title="Show all companies" />
    <LinkToHomepage />
    <h1>{translateCommon('allCompanies')}</h1>
    <p>
      {translateCommon('clickOnRowForView')}{' '}
      {translateCommon('dataGivenInKHryvnias')}
    </p>
    <CompaniesAllDataSection />
  </Layout>
);

export default CompaniesAllData;
