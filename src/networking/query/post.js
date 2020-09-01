import { gql } from 'apollo-boost';

const GET_POST_BY_ID = gql`
  query Post($id: ID) {
    Post(id: $id) {
      id
      title
      text
      user {
        id
        name
      }
    }
  }
`;

export default GET_POST_BY_ID;
