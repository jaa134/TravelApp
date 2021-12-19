import fetch from 'cross-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const GRAPHQL_URL = 'https://countries.trevorblades.com';

// initialize a GraphQL client
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
    fetch
  }),
  cache: new InMemoryCache()
});

export default client;
