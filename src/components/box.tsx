import React, { Dispatch, SetStateAction } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styled from 'styled-components';
import Tooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';

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

const Box = ({ id, name, profit, handleClick }: BoxProps) => (
  <Tooltip
    label={name}
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
        backgroundColor: profit ? 'green' : 'red',
        color: profit ? 'green' : 'red',
      }}
    />
  </Tooltip>
);

Box.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  profit: PropTypes.bool,
  handleClick: PropTypes.func,
};

interface BoxProps {
  id: string;
  name: string;
  profit: boolean;
  handleClick: Dispatch<SetStateAction<string>>;
}

export default Box;
