import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const HomeImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "zeco-home.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>;
  }

  return (
    <>
      <Img
        fluid={data.placeholderImage.childImageSharp.fluid}
        alt={
          'A huge factory with smoking chimneys on the horizon in a snowless winter city in the foreground.'
        }
      />
      <small style={{ float: 'right' }}>zp-fakty.net.ua</small>
    </>
  );
};

export default HomeImage;
