import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const headerPropTypes = {
  siteTitle: PropTypes.string,
  size: PropTypes.number,
  shownPage: PropTypes.string,
};

const headerDefaultProps = {
  siteTitle: ``,
  size: 1,
  shownPage: '',
};

const Container = styled.div`
  background-color: #212121;
  margin-bottom: 1.45rem;
`;

const getInnerStyles = (maxWidth: string) => `
  display: flex;
  margin: 0 auto;
  padding: .7rem 1rem 1rem;
  max-width: ${maxWidth};
`;

const innerDivs = [
  styled.div`${getInnerStyles('none')}`,
  styled.div`${getInnerStyles('960px')}`,
  styled.div`${getInnerStyles('1280px')}`,
  styled.div`${getInnerStyles('1440px')}`,
  styled.div`${getInnerStyles('1600px')}`,
];

const Logo = styled.h1`
  margin: 0;
`;

const LogoLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const PageButtons = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
`;

const PageBtn = styled.div`
  margin-left: 20px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #4682b4b0;
  border: 2px solid #212121;
`;

const pageBtnShownStyle = {
  border: '2px solid aliceblue',
  backgroundColor: 'steelblue',
};

const PageBtnLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: Roboto;
`;

const Header = ({ siteTitle, size, shownPage }: HeaderProps) => {
  const Inner = innerDivs[size || 1];
  const companies = shownPage === 'Show All Companies';
  const charts = shownPage === 'Companies And Charts';

  return (
    <Container>
      <Inner>
        <Logo>
          <LogoLink to="/">{siteTitle}</LogoLink>
        </Logo>
        <PageButtons>
          <PageBtn role="button" style={companies ? pageBtnShownStyle : {}}>
            <PageBtnLink to="/companies/">Companies</PageBtnLink>
          </PageBtn>
          <PageBtn role="button" style={charts ? pageBtnShownStyle : {}}>
            <PageBtnLink to="/companies-and-charts/">Charts</PageBtnLink>
          </PageBtn>
        </PageButtons>
      </Inner>
    </Container>
  );
};

Header.propTypes = headerPropTypes;
Header.defaultProps = headerDefaultProps;

type HeaderProps = InferProps<typeof headerPropTypes>;
export type ShownPage = 'Show All Companies' | 'Companies And Charts';

export default Header;
