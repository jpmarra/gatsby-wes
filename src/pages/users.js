import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';

export default function Users({ data }) {
  const users = data.allUser.nodes;

  return (
    <Layout>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link
              to={`/user/${user.name
                .split(' ')
                .join('')
                .toLowerCase()}`}
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
// This page will query all the tips from our markdown files
export const query = graphql`
  query {
    allUser {
      nodes {
        name
        username
      }
    }
  }
`;
