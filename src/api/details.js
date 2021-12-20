import { gql, useQuery } from '@apollo/client';

export const DETAILS_CONTINENT = gql`
  query ContinentDetails ($code: ID!) {
    continent (code: $code) {
      code
      name
      countries {
        code
        name
        emoji
      }
    }
  }
`;

export const useContinentDetailsQuery = (continentCode) => {
  const { data, loading, error } = useQuery(DETAILS_CONTINENT, {
    fetchPolicy: 'cache-first',
    variables: { code: continentCode }
  });
  return {
    continent: data?.continent,
    continentLoading: loading,
    continentError: error
  };
};

export const DETAILS_COUNTRY = gql`
  query CountryDetails ($code: ID!) {
    country (code: $code) {
      code
      name
      native
      phone
      continent {
        code
        name
      }
      capital
      states {
        code
        name
      }
      languages {
        code
        name
      }
      currency
      emoji
    }
  }
`;

export const useCountryDetailsQuery = (countryCode) => {
  const { data, loading, error } = useQuery(DETAILS_COUNTRY, {
    fetchPolicy: 'cache-first',
    variables: { code: countryCode }
  });
  return {
    country: data?.country,
    countryLoading: loading,
    countryError: error
  };
};

export const DETAILS_LANGUAGE = gql`
  query LanguageDetails ($code: ID!) {
    language (code: $code) {
      code
      name
      native
      rtl
    }
  }
`;

export const useLanguageDetailsQuery = (languageCode) => {
  const { data, loading, error } = useQuery(DETAILS_LANGUAGE, {
    fetchPolicy: 'cache-first',
    variables: { code: languageCode }
  });
  return {
    language: data?.language,
    languageLoading: loading,
    languageError: error
  };
};
