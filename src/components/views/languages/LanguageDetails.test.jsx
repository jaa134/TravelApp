import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { DETAILS_LANGUAGE } from '../../../api/details';
import LanguageDetails, { bem } from './LanguageDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: 'ML' }))
}));

const language = {
  code: 'ML',
  name: 'MyLanguage',
  native: 'FooBar',
  rtl: true,
  __typename: 'Language'
};

const normalMock = {
  request: {
    query: DETAILS_LANGUAGE,
    variables: { code: language.code }
  },
  result: {
    data: {
      language
    }
  }
};

const errorMock = {
  request: {
    query: DETAILS_LANGUAGE,
    variables: { code: language.code }
  },
  error: new Error('something bad happened')
};

const emptyMock = {
  request: {
    query: DETAILS_LANGUAGE,
    variables: { code: language.code }
  },
  result: {
    data: {
      language: null
    }
  }
};

const getWrapper = (mocks) => mount(
  <TestWrapper mocks={mocks}>
    <LanguageDetails />
  </TestWrapper>
);

const getLanguageDetails = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const languageDetails = getLanguageDetails(wrapper);
  expect(languageDetails.exists()).toBe(true);
  expect(languageDetails.find('MuiCircularProgressCircle').exists()).toBe(true);
};

describe('LanguageDetails', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getLanguageDetails(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('Error component is displayed when url param results in no data', async () => {
    const wrapper = getWrapper([emptyMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getLanguageDetails(wrapper).find('NotFoundAlert').exists()).toBe(true);
  });

  test('Language details render after query returns data', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const languageDetails = getLanguageDetails(wrapper);
    expect(languageDetails.find(`h5.${bem('subheader')}`).text()).toBe(language.name);
    expect(languageDetails.find('LabeledDetail').at(0).prop('label')).toBe('Favorite');
    expect(languageDetails.find('LabeledDetail').at(0).find('FavoriteButton').exists()).toBe(true);
    expect(languageDetails.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(languageDetails.find('LabeledDetail').at(1).prop('value')).toBe(language.code);
    expect(languageDetails.find('LabeledDetail').at(2).prop('label')).toBe('Native');
    expect(languageDetails.find('LabeledDetail').at(2).prop('value')).toBe(language.native);
    expect(languageDetails.find('LabeledDetail').at(3).prop('label')).toBe('RTL');
    expect(languageDetails.find('LabeledDetail').at(3).prop('value')).toBe(language.rtl ? 'Yes' : 'No');
  });
});
