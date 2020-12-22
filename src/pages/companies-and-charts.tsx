import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LinkToHomepage from '../components/link-to-homepage';
import SearchCompanies from '../components/search-companies';
import { SearchOnClick } from '../components/search';
import CompanyAllDataAndCharts from '../components/company-all-data-and-charts';
import { CompanyId } from '../translations/translations';
import { toUsreou } from '../data/update-company-profile';
import companies, { companiesIds } from '../data/companies';
import CheckboxControl from '../components/checkbox-control';
import useShowSettings from '../hooks/use-company-all-data-panel-show-settings';
import useLangContext from '../hooks/use-lang-context';

const SearchWrapper = styled.section`
  border-radius: 8px;
  box-shadow: 0px 0px 8px 1px #d4d9dc;
  padding: 10px;
  margin: 1.45rem 0;
`;

const mapUsreousToCompaniesIds = () =>
  companiesIds.reduce((acc: { [key: string]: string }, id) => {
    const usreou = companies[id].usreou;
    acc[(acc[id] = usreou as string)] = id;
    return acc;
  }, {});
const usreousAndIds = mapUsreousToCompaniesIds();

const CompaniesAndCharts = () => {
  const [initLoad, setInitLoad] = useState(true);
  const [companyId, setCompanyId] = useState('');
  const [NOT_USED, triggerTranslating] = useState('');

  const updateCompanyId = () => {
    const query = window.location.search.slice(1);
    const usreou = query.length === 8 && toUsreou(query) && query;
    setCompanyId(() => (usreou ? usreousAndIds[usreou] : ''));
  };

  const updateHistory = (companyId: CompanyId) => {
    const usreou = usreousAndIds[companyId];
    if (usreou) {
      window.history.pushState({ usreou, companyId }, '', `?${usreou}`);
    }
  };

  useEffect(() => {
    window.onpopstate = updateCompanyId;
    const translatingUpdater = {
      id: 'Charts Page',
      triggerTranslating: () => {
        triggerTranslating(() => useLangContext.getLang());
      },
    };
    useLangContext.subscribe(translatingUpdater);

    return () => {
      window.onpopstate = null;
      useLangContext.unsubscribe(translatingUpdater);
    };
  }, []);

  // on loading page check if URL contains usreou, if so - set appropriate id
  if (initLoad) {
    setInitLoad(() => false);
    updateCompanyId();
  }

  const searchOnClick: SearchOnClick = id => {
    updateHistory(id as CompanyId);
    setCompanyId(() => id as CompanyId);
  };

  return (
    <Layout size={3} shownPage="Companies And Charts">
      <SEO title="Companies And Charts" />
      <LinkToHomepage />
      <SearchWrapper>
        <SearchCompanies onClick={searchOnClick} />
      </SearchWrapper>
      {companyId ? (
        <CheckboxControl checkboxSettings={useShowSettings} />
      ) : null}
      <CompanyAllDataAndCharts companyId={companyId} />
    </Layout>
  );
};

export default CompaniesAndCharts;
