import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const headerPropTypes = {
  siteTitle: PropTypes.string,
  size: PropTypes.number,
};

const headerDefaultProps = {
  siteTitle: ``,
  size: 1,
};

const Container = styled.div`
  background-color: #212121;
  margin-bottom: 1.45rem;
`;

const getInnerStyles = (maxWidth: string) => `
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

const Heading = styled.h1`
  margin: 0;
`;

const HeadingLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Header = ({ siteTitle, size }: HeaderProps) => {
  const Inner = innerDivs[size || 1];

  return (
    <Container>
    <Inner>
      <Heading>
        <HeadingLink to="/">{siteTitle}</HeadingLink>
      </Heading>
     </Inner>
  </Container>
  )
};

Header.propTypes = headerPropTypes;

Header.defaultProps = headerDefaultProps;

type HeaderProps = InferProps<typeof headerPropTypes>;

export default Header;
