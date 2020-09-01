// In App.js in a new project

import * as React from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/networking/apolloclient';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}

export default App;
