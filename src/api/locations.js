import { gql, useQuery } from '@apollo/client';

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
    }
  }
`;

export const useListCountriesQuery = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, {
    fetchPolicy: 'cache-first'
  });
  if (error) {
    console.error(error);
  }
  return {
    countries: data?.countries || [],
    countriesLoading: loading,
    countriesError: error
  };
};
