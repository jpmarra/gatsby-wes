import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import TipsList from '../components/styles/TipsListStyles';

export default function Tips({ data }) {
  const tips = data.allMdx.nodes;

  return (
    <Layout>
      <TipsList>
        {tips.map(tip => (
          <li key={tip.id}>
            <Link to={`/tip/${tip.frontmatter.slug}`}>
              {tip.frontmatter.title}
            </Link>
          </li>
        ))}
      </TipsList>
    </Layout>
  );
}
// This page will query all the tips from our markdown files
export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;
