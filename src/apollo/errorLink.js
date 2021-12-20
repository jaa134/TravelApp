import { onError } from '@apollo/client/link/error';

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

export default errorLink;
