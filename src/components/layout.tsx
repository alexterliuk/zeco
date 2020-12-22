import React, { ReactElement } from 'react';
import PropTypes, { ReactElementLike } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Header, { ShownPage } from './header';
import { translateCommon } from '../translations/translate';
import './layout.css';

const getLayoutStyles = (maxWidth: string) => `
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: ${maxWidth};
  padding: 0 1.0875rem 1.45rem;
`;

const containers = [
  styled.div`${getLayoutStyles('none')}`,
  styled.div`${getLayoutStyles('960px')}`,
  styled.div`${getLayoutStyles('1280px')}`,
  styled.div`${getLayoutStyles('1440px')}`,
  styled.div`${getLayoutStyles('1600px')}`,
];

const Footer = ({ className, children }: any) => (
  <footer className={className}>{children}</footer>
);

const LayoutFooter = styled(Footer)`
  margin-top: 2rem;
`;

const FooterInfo = styled.p`
  font-size: 90%;
  margin-bottom: 0;
`;

const Layout = ({ children, size, shownPage }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const Container = containers[size || 1];

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        size={size}
        shownPage={shownPage}
      />
      <Container>
        <main style={{ flexGrow: 1 }}>{children}</main>
        <LayoutFooter>
          <h4 style={{ marginBottom: '1rem' }}>© {new Date().getFullYear()}</h4>
          <FooterInfo>{translateCommon('footerInfo1')}</FooterInfo>
          <FooterInfo>
            {translateCommon('footerInfo2')}{' '}
            <a href="https://www.prozvit.com.ua" target="_blank">
              www.prozvit.com.ua
            </a>
          </FooterInfo>
        </LayoutFooter>
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  shownPage: PropTypes.string,
};

interface LayoutProps {
  children: (ReactElementLike | null)[];
  size?: number;
  shownPage?: ShownPage;
}

export default Layout;
