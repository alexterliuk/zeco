import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { translateCommon } from '../translations/translate';
import useLangContext from '../hooks/use-lang-context';
import LinkToHomepage from '../components/link-to-homepage';

const NotFoundPage = () => {
  const [NOT_USED, triggerTranslating] = useState(useLangContext.getLang());

  useEffect(() => {
    const translatingUpdater = {
      id: '404 Page',
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
      <SEO title="404: Not found" />
      <LinkToHomepage />
      <h1>404 :(</h1>
      <p>{translateCommon('404Page')}</p>
    </Layout>
  );
};

export default NotFoundPage;
