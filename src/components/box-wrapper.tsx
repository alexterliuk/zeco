import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Box from './box';
import companiesData from '../data/companies-data';

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

  return (
    <>
      <Container>
        {companiesData.map(company => {
          const title = company.name;
          const finRes = company.financials[2020].netProfit.quarters[1] > 0;
          return (
            <Box title={title} profit={finRes || ''} key={`${company.name}`} />
          );
        })}
      </Container>
    </>
  );
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default BoxWrapper;
