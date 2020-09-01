/**
 * Apollo Client Specifications
 */

// Apollo Imports
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';

// import { HttpLink } from 'apollo-client-preset';
// import AsyncStorage from '@react-native-community/async-storage';

// refer this for graphiql playground
// const API_URL = 'https://lucasconstantino.github.io/graphiql-online/';
const API_URL = 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex';

const transport = new createUploadLink({
  uri: API_URL,
  credentials: 'same-origin',
});

const auth = setContext(async (req, { headers }) => {
  // const authToken = await AsyncStorage.getItem('authToken');
  const authToken =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDA4MzU0NzAsImlhdCI6MTU5ODI0MzQ3MCwicHJvamVjdElkIjoiY2l5ejkwMWVuNGo1OTAxODV3a21leHlleCIsInVzZXJJZCI6ImNrZHZyMHl0dTBhcGMwMTI2bnBhbmRzbjEiLCJhdXRoRGF0YSI6eyJlbWFpbCI6InNodWJoYW1iYXRoZTFAZ21haWwuY29tIn0sIm1vZGVsTmFtZSI6IlVzZXIifQ.xMOuGOGQHgWi-_AAaM9-rChameZCk3Ic4f2sTUVZ5uI';

  return {
    ...headers,
    headers: {
      // Authorization: `Bearer ${authToken}`,
      Authorization: authToken,
    },
  };
});

const errors = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.warn(networkError);
  }
  if (graphQLErrors) console.warn(graphQLErrors);
});

//Retries API call 5 times with a random interval before throwing a Network Error
const retry = new RetryLink();

const apolloClient = new ApolloClient({
  link: ApolloLink.from([auth, errors, retry, transport]),
  cache: new InMemoryCache(),
});

export default apolloClient;
