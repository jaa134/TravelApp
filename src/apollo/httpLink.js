import { HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export const GRAPHQL_URL = 'https://countries.trevorblades.com';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  fetch
});

export default httpLink;
