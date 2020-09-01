/**
 * Delete Post Mutation
 */

import gql from 'graphql-tag';

const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
      text
    }
  }
`;

export default deletePost;
