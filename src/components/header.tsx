import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const headerPropTypes = {
  siteTitle: PropTypes.string,
};

const headerDefaultProps = {
  siteTitle: ``,
};

const Container = styled.div`
  background-color: #212121;
  margin-bottom: 1.45rem;
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: .7rem 1rem 1rem;
`;

const Heading = styled.h1`
  margin: 0;
`;

const HeadingLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Header = ({ siteTitle }: HeaderProps) => (
  <Container>
    <Inner>
      <Heading>
        <HeadingLink to="/">{siteTitle}</HeadingLink>
      </Heading>
    </Inner>
  </Container>
);

Header.propTypes = headerPropTypes;

Header.defaultProps = headerDefaultProps;

type HeaderProps = InferProps<typeof headerPropTypes>;

export default Header;
