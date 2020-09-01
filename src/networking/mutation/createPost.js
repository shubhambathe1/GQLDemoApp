/**
 * Update Post Mutation
 */

import gql from 'graphql-tag';

const createPost = gql`
  mutation createPost($userId: ID, $text: String!, $title: String!) {
    createPost(userId: $userId, text: $text, title: $title) {
      id
      title
      text
    }
  }
`;

export default createPost;
