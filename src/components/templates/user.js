import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../Layout';

export default function Tip({ data, pageContext }) {
    const { user} = data;
  return (
    <Layout>
      <Helmet>
        <title>{user.name}</title>
      </Helmet>
      <div>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>{user.phone}</h2>
        <h2>{user.website}</h2>
      </div>
    </Layout>
  );
}

//! write a page query that is DYNAMIC
export const query = graphql`
  query($id: String!) {
    user(id: { eq: $id }) {
      id
      name
      email
      phone
      website
    }
  }
`;
