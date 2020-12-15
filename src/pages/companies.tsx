import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { translateCommon } from '../translations/translate';
import LinkToHomepage from '../components/link-to-homepage';
import CompaniesAllDataSection from '../components/companies-all-data-section';

const Companies = () => (
  <Layout size={3} shownPage="Show All Companies">
    <SEO title="Show All Companies" />
    <LinkToHomepage />
    <h1>{translateCommon('allCompanies')}</h1>
    <p>
      {translateCommon('clickOnRowForView')}{' '}
      {translateCommon('dataGivenInKHryvnias')}
    </p>
    <CompaniesAllDataSection />
  </Layout>
);

export default Companies;
