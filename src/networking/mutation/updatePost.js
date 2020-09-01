/**
 * Update Post Mutation
 */

import gql from 'graphql-tag';

const updatePost = gql`
  mutation updatePost($id: ID!, $text: String!, $title: String!) {
    updatePost(id: $id, text: $text, title: $title) {
      id
      title
      text
    }
  }
`;

export default updatePost;
