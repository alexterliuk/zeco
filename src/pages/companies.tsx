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

const Companies = () => {
  const [initLoad, setInitLoad] = useState(true);
  const [companyId, setCompanyId] = useState('');

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
    return () => {
      window.onpopstate = null;
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
    <Layout size={3}>
      <SEO title="Companies" />
      <LinkToHomepage />
      <SearchWrapper>
        <SearchCompanies onClick={searchOnClick} />
      </SearchWrapper>
      <CompanyAllDataAndCharts companyId={companyId} />
    </Layout>
  );
};

export default Companies;
