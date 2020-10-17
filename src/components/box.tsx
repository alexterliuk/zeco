import React from 'react';
import styled from 'styled-components';
import Tooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';
import PropTypes, { InferProps } from 'prop-types';

const boxPropTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  profit: PropTypes.bool,
};

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

const Box = ({ id, name, profit }: BoxProps) => (
  <>
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
        onClick={() => ({})}
        style={{
          backgroundColor: profit ? 'green' : 'red',
          color: profit ? 'green' : 'red',
        }}
      />
    </Tooltip>
  </>
);

Box.propTypes = boxPropTypes;

type BoxProps = InferProps<typeof boxPropTypes>;

export default Box;
