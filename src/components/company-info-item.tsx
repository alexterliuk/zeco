import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format, getFinFormatsForValue } from '../helpers/format/index';
import { translate } from '../translations/translate';
import {
  TranslationsType,
  TranslationsCompanyKey,
} from '../translations/translations';

const Item = styled.p`
  display: flex;
  margin-bottom: calc(1.45rem / 2);
`;

const Left = styled.span``;

const Right = styled.span`
  margin-left: auto;
`;

const CompanyInfoItem = ({
  translateConfig,
  name,
  value,
}: CompanyInfoItemProps) => {
  const { id, type } = translateConfig;

  const translatedName = translate(id, type, name);
  const formattedValue = format(value, getFinFormatsForValue(name));

  return name ? (
    <Item>
      <Left>{translatedName}</Left>
      <Right>{formattedValue}</Right>
    </Item>
  ) : (
    <Item>
      <Left>{value}</Left>
    </Item>
  );
};

CompanyInfoItem.propTypes = {
  translateConfig: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  pos: PropTypes.number,
};

interface CompanyInfoItemProps {
  translateConfig: {
    id: string;
    type: TranslationsType;
  };
  name: TranslationsCompanyKey;
  value: any;
  pos?: number;
}

export default CompanyInfoItem;
