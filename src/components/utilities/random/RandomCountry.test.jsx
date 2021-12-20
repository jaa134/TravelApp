import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { LIST_COUNTRIES } from '../../../api/lists';
import RandomCountry, { bem } from './RandomCountry';
import { paths } from '../../../constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: (props) => <div className="Navigate" {...props} />
}));

const TIMEOUT = 500;

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

const getWrapper = (mocks) => mount(
  <TestWrapper mocks={mocks}>
    <RandomCountry timeUntilNav={TIMEOUT} />
  </TestWrapper>
);

const getCountriesList = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const countriesList = getCountriesList(wrapper);
  expect(countriesList.exists()).toBe(true);
  expect(countriesList.find('MuiCircularProgressCircle').exists()).toBe(true);
};

describe('RandomCountry', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getCountriesList(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('Shows random country information when countries query resolves and before navigation', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    // wait half as long to ensure country has been selected
    await updateWrapper(wrapper, TIMEOUT / 2);
    expect(getCountriesList(wrapper).find('CountryCard').exists()).toBe(true);
  });

  test('Renders navigation component after desired number of seconds to navigate user to a random country url', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper, 0);
    // wait twice as long to ensure rendering can complete
    await updateWrapper(wrapper, TIMEOUT * 2);
    const countriesList = getCountriesList(wrapper);
    expect(countriesList.find('CountryCard').exists()).toBe(false);
    expect(countriesList.find('Navigate').prop('to')).toContain(`/${paths.COUNTRY}/code`);
  });
});
