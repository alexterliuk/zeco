import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styled from 'styled-components';

const companyInfoItemPropTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  pos: PropTypes.number,
};

const Item = styled.p`
  display: flex;
  margin-bottom: calc(1.45rem / 2);
`;

const Left = styled.span``;

const Right = styled.span`
  margin-left: auto;
`;

const CompanyInfoItem = ({ name, value }: companyInfoItemProps) => {
  return name ? (
    <Item>
      <Left>{name}</Left>
      <Right>{value}</Right>
    </Item>
  ) : (
    <Item>
      <Left>{value}</Left>
    </Item>
  );
};

CompanyInfoItem.propTypes = companyInfoItemPropTypes;

type companyInfoItemProps = InferProps<typeof companyInfoItemPropTypes>;

export default CompanyInfoItem;
