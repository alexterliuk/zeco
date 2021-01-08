import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { translateCommon } from '../translations/translate';
import useLangContext from '../hooks/use-lang-context';
import LinkToHomepage from '../components/link-to-homepage';
import delayAndCall from '../helpers/delay-and-call';

let initLoad = true;

const NotFoundPage = () => {
  const [NOT_USED, triggerTranslating] = useState('');

  useEffect(() => {
    const updater = useLangContext.on('404 Page', triggerTranslating);
    return () => {
      useLangContext.off(updater);
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
    <Layout>
      <SEO title="404: Not found" />
      {initLoad ? null : (
        <>
          <LinkToHomepage />
          <h1>404 :(</h1>
          <p>{translateCommon('404Page')}</p>
        </>
      )}
    </Layout>
  );
};

export default NotFoundPage;
