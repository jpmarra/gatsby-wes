import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import 'normalize.css';

import './styles/global.css';
import LayoutStyles from './styles/LayoutStyles';
import Nav from './Nav';
import Footer from './Footer';

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query FooterData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <LayoutStyles>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <h1>JP Marra</h1>
      <Nav />
      {children}
      <Footer />
    </LayoutStyles>
  );
}
