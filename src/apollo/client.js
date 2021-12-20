import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import httpLink from './httpLink';
import errorLink from './errorLink';

// initialize a GraphQL client
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default client;
