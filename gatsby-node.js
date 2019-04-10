const path = require('path');
const axios = require('axios');

async function createMDXPages({ graphql, actions }) {
  //! 1. Query our tips!
  const { data } = await graphql(`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "tip" } } }) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  //! 2. Loop over the tips
  data.allMdx.nodes.forEach((tip, idx) => {
    //! 3. For each tip, create a page
    actions.createPage({
      //* what is the url for the page?
      path: `/tip/${tip.frontmatter.slug}`,
      //* what component will we render when someone hits this page?
      component: path.resolve(`./src/components/templates/tip.js`),
      //* what data do we want to pass for the page itself?
      context: {
        id: tip.id,
        prev: data.allMdx.nodes[idx - 1],
        next: data.allMdx.nodes[idx + 1],
      },
    });
  });
}

async function createUserPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      allUser {
        nodes {
          id
          username
          name
          email
          phone
          website
        }
      }
    }
  `);
  data.allUser.nodes.forEach(user => {
    actions.createPage({
      path: `/user/${user.name
        .split(' ')
        .join('')
        .toLowerCase()}`,
      component: path.resolve(`./src/components/templates/user.js`),
      context: {
        id: user.id,
      },
    });
  });
}

exports.createPages = async function({ graphql, actions }) {
  createMDXPages({ graphql, actions });
  createUserPages({ graphql, actions });
};

async function sourceUsers({ actions, createNodeId, createContentDigest }) {
  //! 1. fetch the users
  // destructure the data off of the response and rename it to users
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  //! 2. loop over the users
  users.forEach(user => {
    console.log('Sourcing a user');
    //! 3. create a node for each user in the graphql API
    const node = {
      // take all the users properties
      ...user,
      // add a couple custom properties that GATSBY requires
      id: createNodeId(`user-${user.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'User',
        mediaType: 'application/json',
        contentDigest: createContentDigest(user),
      },
    };
    actions.createNode(node);
  });
}

exports.sourceNodes = async function({
  actions,
  createNodeId,
  createContentDigest,
}) {
  await sourceUsers({ actions, createNodeId, createContentDigest });
};
