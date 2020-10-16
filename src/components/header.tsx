import { Link } from "gatsby";
import PropTypes, { InferProps } from "prop-types";
import React from "react";
import styled from "styled-components";


const headerPropTypes = {
  siteTitle: PropTypes.string,
};

const headerDefaultProps = {
  siteTitle: ``,
};

const Container = styled.div`
  background: rebeccapurple;
  marginBottom: 1.45rem;
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;,
`;

const Header = ({ siteTitle }: HeaderProps) => (
  <Container>
    <Inner>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </Inner>
  </Container>
);

Header.propTypes = headerPropTypes;

Header.defaultProps = headerDefaultProps;

type HeaderProps = InferProps<typeof headerPropTypes>;

export default Header;
