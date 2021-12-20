import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { LIST_COUNTRIES } from '../../../api/lists';
import { getItemmKey, FAVORITES_STORAGE_KEY } from '../../utilities/favorites/FavoritesProvider';
import CountriesList, { bem, NUM_LOADING_MOCKS } from './CountriesList';

const getCountry = (i) => ({
  name: `name${i}`,
  code: `code${i}`,
  emoji: `emoji${i}`,
  __typename: 'Country'
});

const countries = [...new Array(3)].map((_, i) => getCountry(i));

const normalMock = {
  request: {
    query: LIST_COUNTRIES
  },
  result: {
    data: {
      countries
    }
  }
};

const errorMock = {
  request: {
    query: LIST_COUNTRIES
  },
  error: new Error('something bad happened')
};

const emptyMock = {
  request: {
    query: LIST_COUNTRIES
  },
  result: {
    data: {
      countries: []
    }
  }
};

const getWrapper = (mocks, favoritesOnly) => mount(
  <TestWrapper mocks={mocks}>
    <CountriesList favoritesOnly={favoritesOnly} />
  </TestWrapper>
);

const getCountriesList = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const countriesList = getCountriesList(wrapper);
  expect(countriesList.exists()).toBe(true);
  expect(countriesList.find('MuiSkeletonRoot')).toHaveLength(NUM_LOADING_MOCKS);
};

describe('CountriesList', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getCountriesList(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('No items alert renders when query returns no data', async () => {
    const wrapper = getWrapper([emptyMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const continentsList = getCountriesList(wrapper);
    expect(continentsList.find('CountryCard')).toHaveLength(0);
    expect(continentsList.find('NoItemsAlert').exists()).toBe(true);
  });

  test('All country rows render after query returns data when favoritesOnly disabled', async () => {
    // make sure to reset storage
    localStorage.clear();

    const wrapper = getWrapper([normalMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const countryCard = getCountriesList(wrapper).find('CountryCard');
    expect(countryCard).toHaveLength(countries.length);
    expect(countryCard.at(0).prop('code')).toBe(countries[0].code);
    expect(countryCard.at(1).prop('code')).toBe(countries[1].code);
    expect(countryCard.at(2).prop('code')).toBe(countries[2].code);
  });

  test('Only favorite country rows render after query returns data when favoritesOnly enabled', async () => {
    // make sure to reset and update storage with appropriate values
    localStorage.clear();
    const country = countries[0];
    const storageValue = { [getItemmKey(country.code, country.__typename)]: true };
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(storageValue));

    const wrapper = getWrapper([normalMock], true);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const countryCard = getCountriesList(wrapper).find('CountryCard');
    expect(countryCard).toHaveLength(1);
    expect(countryCard.prop('code')).toBe(country.code);
  });
});
