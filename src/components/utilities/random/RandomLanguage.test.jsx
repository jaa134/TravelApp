import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { LIST_LANGUAGES } from '../../../api/lists';
import RandomLanguage, { bem } from './RandomLanguage';
import { paths } from '../../../constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: (props) => <div className="Navigate" {...props} />
}));

const TIMEOUT = 500;

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

const getWrapper = (mocks) => mount(
  <TestWrapper mocks={mocks}>
    <RandomLanguage timeUntilNav={TIMEOUT} />
  </TestWrapper>
);

const getLanguagesList = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const languagesList = getLanguagesList(wrapper);
  expect(languagesList.exists()).toBe(true);
  expect(languagesList.find('MuiCircularProgressCircle').exists()).toBe(true);
};

describe('RandomLanguage', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getLanguagesList(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('Shows random language information when languages query resolves and before navigation', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    // wait half as long to ensure language has been selected
    await updateWrapper(wrapper, TIMEOUT / 2);
    expect(getLanguagesList(wrapper).find('LanguageCard').exists()).toBe(true);
  });

  test('Renders navigation component after desired number of seconds to navigate user to a random language url', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper, 0);
    // wait twice as long to ensure rendering can complete
    await updateWrapper(wrapper, TIMEOUT * 2);
    const languagesList = getLanguagesList(wrapper);
    expect(languagesList.find('LanguageCard').exists()).toBe(false);
    expect(languagesList.find('Navigate').prop('to')).toContain(`/${paths.LANGUAGE}/code`);
  });
});
