import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { translateCommon } from '../translations/translate';
import LinkToHomepage from '../components/link-to-homepage';
import CompaniesAllDataSection from '../components/companies-all-data-section';
import useLangContext from '../hooks/use-lang-context';
import delayAndCall from '../helpers/delay-and-call';

let initLoad = true;

const Companies = () => {
  const [NOT_USED, triggerTranslating] = useState('');

  useEffect(() => {
    const translatingUpdater = {
      id: 'Companies Page',
      triggerTranslating: () => {
        triggerTranslating(() => useLangContext.getLang());
      },
    };
    useLangContext.subscribe(translatingUpdater);
    return () => {
      useLangContext.unsubscribe(translatingUpdater);
    };
  }, []);

  // prevent possible default lang page flash before selected lang is applied
  if (initLoad) {
    delayAndCall(() => {
      initLoad = false;
      triggerTranslating(() => useLangContext.getLang());
    }, 0);
  }

  return (
    <Layout size={3} shownPage="Companies">
      <SEO title={translateCommon('companiesPageTitle')} />
      {initLoad ? null : (
        <>
          <LinkToHomepage />
          <h1>{translateCommon('allCompanies')}</h1>
          <p>
            {translateCommon('clickOnRowForView')}{' '}
            {translateCommon('dataGivenInKHryvnias')}
          </p>
          <CompaniesAllDataSection />
        </>
      )}
    </Layout>
  );
};

export default Companies;
