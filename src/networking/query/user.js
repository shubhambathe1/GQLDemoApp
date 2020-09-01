/**
 *  Query clients
 */

// import gql from 'graphql-tag';
import { gql } from 'apollo-boost';
// const User = gql`
// query {
//     users(limit: 5) {
//     id
//     name
//   }
// }
// `;

const User = gql`
  query {
    User(email: "shubhambathe1@gmail.com", id: "ckdvr22960aq80126hfr9olod") {
      id
      name
      email
      password
      posts {
        id
        title
        text
      }
    }
  }
`;

export default User;
