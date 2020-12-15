import React, { ReactElement } from 'react';
import PropTypes, { ReactElementLike } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Header from './header';
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

const Layout = ({ children, size }: any) => {
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
      />
      <Container>
        <main style={{ flexGrow: 1 }}>{children}</main>
        <LayoutFooter>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </LayoutFooter>
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
};

export default Layout;
