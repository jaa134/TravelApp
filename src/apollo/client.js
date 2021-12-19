import { ApolloClient, InMemoryCache } from '@apollo/client';

export const GRAPHQL_URL = 'https://countries.trevorblades.com';

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_URL
});

export default client;
