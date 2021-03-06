import { gql, useQuery } from '@apollo/client';

export const LIST_CONTINENTS = gql`
  query ContinentsList {
    continents {
      code
      name
    }
  }
`;

export const useListContinentsQuery = () => {
  const { data, loading, error } = useQuery(LIST_CONTINENTS, {
    fetchPolicy: 'cache-first'
  });
  return {
    continents: data?.continents,
    continentsLoading: loading,
    continentsError: error
  };
};

export const LIST_COUNTRIES = gql`
  query CountriesList {
    countries {
      code
      name
      emoji
    }
  }
`;

export const useListCountriesQuery = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, {
    fetchPolicy: 'cache-first'
  });
  return {
    countries: data?.countries,
    countriesLoading: loading,
    countriesError: error
  };
};

export const LIST_LANGUAGES = gql`
  query LanguagesList {
    languages {
      code
      name
    }
  }
`;

export const useListLanguagesQuery = () => {
  const { data, loading, error } = useQuery(LIST_LANGUAGES, {
    fetchPolicy: 'cache-first'
  });
  return {
    languages: data?.languages,
    languagesLoading: loading,
    languagesError: error
  };
};
