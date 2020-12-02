import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { translateCommon } from '../translations/translate';

const LinkWrapper = styled.div`
  display: flex;
`;

const LinkWrapperChild = styled.div`
  margin-left: auto;
`;

const LinkToHomepage = () => (
  <LinkWrapper>
    <LinkWrapperChild>
      <Link to="/">{translateCommon('backToHomepage')}</Link>
    </LinkWrapperChild>
  </LinkWrapper>
);

export default LinkToHomepage;
