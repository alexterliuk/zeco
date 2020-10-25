import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styled from 'styled-components';
import { format, getFinFormatsForValue } from '../helpers/format/index';

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
  const formattedValue = format(value, getFinFormatsForValue(name));

  return name ? (
    <Item>
      <Left>{name}</Left>
      <Right>{formattedValue}</Right>
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
