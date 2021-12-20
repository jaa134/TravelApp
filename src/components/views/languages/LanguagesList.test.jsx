import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { LIST_LANGUAGES } from '../../../api/lists';
import { getItemmKey, FAVORITES_STORAGE_KEY } from '../../utilities/favorites/FavoritesProvider';
import LanguagesList, { bem, NUM_LOADING_MOCKS } from './LanguagesList';

const getLanguage = (i) => ({
  name: `name${i}`,
  code: `code${i}`,
  __typename: 'Language'
});

const languages = [...new Array(3)].map((_, i) => getLanguage(i));

const normalMock = {
  request: {
    query: LIST_LANGUAGES
  },
  result: {
    data: {
      languages
    }
  }
};

const errorMock = {
  request: {
    query: LIST_LANGUAGES
  },
  error: new Error('something bad happened')
};

const emptyMock = {
  request: {
    query: LIST_LANGUAGES
  },
  result: {
    data: {
      languages: []
    }
  }
};

const getWrapper = (mocks, favoritesOnly) => mount(
  <TestWrapper mocks={mocks}>
    <LanguagesList favoritesOnly={favoritesOnly} />
  </TestWrapper>
);

const getLanguagesList = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const languagesList = getLanguagesList(wrapper);
  expect(languagesList.exists()).toBe(true);
  expect(languagesList.find('MuiSkeletonRoot')).toHaveLength(NUM_LOADING_MOCKS);
};

describe('LanguagesList', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getLanguagesList(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('No items alert renders when query returns no data', async () => {
    const wrapper = getWrapper([emptyMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const languagesList = getLanguagesList(wrapper);
    expect(languagesList.find('LanguageCard')).toHaveLength(0);
    expect(languagesList.find('NoItemsAlert').exists()).toBe(true);
  });

  test('All language rows render after query returns data when favoritesOnly disabled', async () => {
    // make sure to reset storage
    localStorage.clear();

    const wrapper = getWrapper([normalMock], false);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const languageCard = getLanguagesList(wrapper).find('LanguageCard');
    expect(languageCard).toHaveLength(languages.length);
    expect(languageCard.at(0).prop('code')).toBe(languages[0].code);
    expect(languageCard.at(1).prop('code')).toBe(languages[1].code);
    expect(languageCard.at(2).prop('code')).toBe(languages[2].code);
  });

  test('Only favorite language rows render after query returns data when favoritesOnly enabled', async () => {
    // make sure to reset and update storage with appropriate values
    localStorage.clear();
    const language = languages[0];
    const storageValue = { [getItemmKey(language.code, language.__typename)]: true };
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(storageValue));

    const wrapper = getWrapper([normalMock], true);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const languageCard = getLanguagesList(wrapper).find('LanguageCard');
    expect(languageCard).toHaveLength(1);
    expect(languageCard.prop('code')).toBe(language.code);
  });
});
