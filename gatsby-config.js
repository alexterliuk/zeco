require('dotenv').config({
  path: `config/.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Zeco`,
    description: `Фінансові результати Топ-100 держкомпаній України за 2016-2020 роки.`,
    author: `https://github.com/alexterliuk`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        // background_color: `#663399`,
        background_color: `#313131`,
        // theme_color: `#663399`,
        theme_color: `#313131`,
        display: `minimal-ui`,
        icon: `src/images/zeco-icon.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
