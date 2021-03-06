/**
 * SEO component that queries for data with Gatsby's useStaticQuery React hook.
 * It also uses hook for updating lang attr in html tag.
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import useLangContext from '../hooks/use-lang-context';

function SEO({ description, meta, title }: SEOProps) {
  const [lang, setLang] = useState(useLangContext.getLang());
  useEffect(() => {
    const updater = useLangContext.on('SEO', setLang);
    return () => {
      useLangContext.off(updater);
    };
  }, []);

  const { site, image } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        image: file(relativePath: { eq: "zeco-home.jpg" }) {
          publicURL
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `Zeco | Збитки держпідприємств України`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: image.publicURL,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.proptypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

SEO.defaultProps = {
  description: ``,
  meta: [],
  title: ``,
};

interface SEOProps {
  description: string;
  meta: Array<{ name: string; content: any }>;
  title: string;
}

export default SEO;
