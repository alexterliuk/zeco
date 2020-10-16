import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Box from './box';

const Container = styled.div`
  border: 1px solid lightgrey;
  margin: 10px;
  padding: 5px;
  max-width: 762px;
`;

const BoxWrapper = ({ children }: any) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  const data = Array(100).fill(() => Math.random().toFixed(1));

  return (
    <>
      <Container>
        {data.map((f, i) => (
          <Box profit={+f() > 0.3 ? '' : 1} key={`f` + i + i} />
        ))}
      </Container>
    </>
  );
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default BoxWrapper;
