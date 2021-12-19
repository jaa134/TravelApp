import { gql, useQuery } from '@apollo/client';

// write a GraphQL query that asks for names and codes for all countries
const COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

export const useListCountriesQuery = () => {
  const { data, loading, error } = useQuery(COUNTRIES);
  return {
    countries: data?.countries || [],
    countriesLoading: loading,
    countriesError: error
  };
};
