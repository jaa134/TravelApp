import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { LIST_CONTINENTS } from '../../../api/lists';
import { getItemmKey, FAVORITES_STORAGE_KEY } from '../../utilities/favorites/FavoritesProvider';
import ContinentsList, { bem, NUM_LOADING_MOCKS } from './ContinentsList';

const getContinent = (i) => ({
  name: `name${i}`,
  code: `code${i}`,
  __typename: 'Continent'
});

const continents = [...new Array(3)].map((_, i) => getContinent(i));

const normalMock = {
  request: {
    query: LIST_CONTINENTS
  },
  result: {
    data: {
      continents
    }
  }
};

const errorMock = {
  request: {
    query: LIST_CONTINENTS
  },
  error: new Error('something bad happened')
};

const emptyMock = {
  request: {
    query: LIST_CONTINENTS
  },
  result: {
    data: {
      continents: []
    }
  }
};

const getWrapper = (mocks, favoritesOnly) => mount(
  <TestWrapper mocks={mocks}>
    <ContinentsList favoritesOnly={favoritesOnly} />
  </TestWrapper>
);

const getContinentsList = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const continentsList = getContinentsList(wrapper);
  expect(continentsList.exists()).toBe(true);
  expect(continentsList.find('MuiSkeletonRoot')).toHaveLength(NUM_LOADING_MOCKS);
};

describe('ContinentsList', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getContinentsList(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('No items alert renders when query returns no data', async () => {
    const wrapper = getWrapper([emptyMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getContinentsList(wrapper).find('ContinentCard')).toHaveLength(0);
  });

  test('All continent rows render after query returns data when favoritesOnly disabled', async () => {
    // make sure to reset storage
    localStorage.clear();

    const wrapper = getWrapper([normalMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const continentCard = getContinentsList(wrapper).find('ContinentCard');
    expect(continentCard).toHaveLength(continents.length);
    expect(continentCard.at(0).prop('code')).toBe(continents[0].code);
    expect(continentCard.at(1).prop('code')).toBe(continents[1].code);
    expect(continentCard.at(2).prop('code')).toBe(continents[2].code);
  });

  test('Only favorite continent rows render after query returns data when favoritesOnly enabled', async () => {
    // make sure to reset and update storage with appropriate values
    localStorage.clear();
    const continent = continents[0];
    const storageValue = { [getItemmKey(continent.code, continent.__typename)]: true };
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(storageValue));

    const wrapper = getWrapper([normalMock], true);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const continentCard = getContinentsList(wrapper).find('ContinentCard');
    expect(continentCard).toHaveLength(1);
    expect(continentCard.prop('code')).toBe(continent.code);
  });
});
