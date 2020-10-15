import { Link } from "gatsby";
import PropTypes, { InferProps } from "prop-types";
import React from "react";

const headerPropTypes = {
  siteTitle: PropTypes.string,
};

const headerDefaultProps = {
  siteTitle: ``,
};

const Header = ({ siteTitle }: HeaderProps) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
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
    </div>
  </header>
);

Header.propTypes = headerPropTypes;

Header.defaultProps = headerDefaultProps;

type HeaderProps = InferProps<typeof headerPropTypes>;

export default Header;
