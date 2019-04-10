const path = require('path');

module.exports = {
  siteMetadata: {
    title: "JP Marra's Website",
    description: 'A website',
    author: 'JP Marra',
  },
  plugins: [
    // we first source images from the filesystem
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    // source the markdown tips from the tips folder
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tip`,
        path: `${__dirname}/src/tips`,
      },
    },
    // then we use transformer sharp to resize and compress them
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    // then we use gatsby mdx to parse markdown and probvide it info on how
    // to handle images
    {
      resolve: 'gatsby-mdx',
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
};
