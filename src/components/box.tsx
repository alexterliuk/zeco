import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';
import { translate } from '../translations/translate';

const Container = styled.button`
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin: 5px;
  padding: 0;
  border: none;
  border-radius: 2px;
`;

const Box = ({ id, profit, handleClick }: BoxProps) => (
  <Tooltip
    label={translate(id, 'companies', 'shortName')}
    style={{
      background: 'hsla(0, 0%, 0%, 0.75)',
      color: 'white',
      border: 'none',
      borderRadius: '2px',
      padding: '.25em .5em',
    }}
  >
    <Container
      onClick={() => {
        handleClick(id);
      }}
      style={{
        backgroundColor: profit ? '#0c920c' : 'red',
        color: profit ? '#0c920c' : 'red',
      }}
    />
  </Tooltip>
);

Box.propTypes = {
  id: PropTypes.string.isRequired,
  profit: PropTypes.bool,
  handleClick: PropTypes.func,
};

interface BoxProps {
  id: string;
  profit: boolean;
  handleClick: (id: string) => void;
}

export default Box;
