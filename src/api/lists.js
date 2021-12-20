import { gql, useQuery } from '@apollo/client';

const LIST_CONTINENTS = gql`
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
  if (error) {
    console.error(error);
  }
  return {
    continents: data?.continents,
    continentsLoading: loading,
    continentsError: error
  };
};

const LIST_COUNTRIES = gql`
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
  if (error) {
    console.error(error);
  }
  return {
    countries: data?.countries,
    countriesLoading: loading,
    countriesError: error
  };
};

const LIST_LANGUAGES = gql`
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
  if (error) {
    console.error(error);
  }
  return {
    languages: data?.languages,
    languagesLoading: loading,
    languagesError: error
  };
};
