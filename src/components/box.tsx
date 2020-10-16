import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

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

const Box = (props: any) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <Container
        style={{
          backgroundColor: props.profit ? 'green' : 'red',
          color: props.profit ? 'green' : 'red',
        }}
      />
    </>
  );
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Box;
