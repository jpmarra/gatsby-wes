import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import Helmet from 'react-helmet';

import Layout from '../Layout';
import tipStyles from '../styles/tip.module.scss';

export default function Tip({ data, pageContext }) {
  return (
    <Layout>
      <Helmet>
        <title>{data.mdx.frontmatter.title}</title>
      </Helmet>
      <div className={tipStyles.tip}>
        {pageContext.prev && <Link to={`/tip/${pageContext.prev.frontmatter.slug}`}>← Previous </Link>}
        {pageContext.next && <Link to={`/tip/${pageContext.next.frontmatter.slug}`}>Next →</Link>}
        <h2>{data.mdx.frontmatter.title}</h2>
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
        {pageContext.prev && <Link to={`/tip/${pageContext.prev.frontmatter.slug}`}>← Previous </Link>}
        {pageContext.next && <Link to={`/tip/${pageContext.next.frontmatter.slug}`}>Next →</Link>}
      </div>
    </Layout>
  )
}

//! write a page query that is DYNAMIC
export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
      frontmatter {
        slug
        title
      }
    }
  }
`;
