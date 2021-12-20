import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { LIST_CONTINENTS } from '../../../api/lists';
import RandomContinent, { bem } from './RandomContinent';
import { paths } from '../../../constants';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: (props) => <div className="Navigate" {...props} />
}));

const TIMEOUT = 500;

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

const getWrapper = (mocks) => mount(
  <TestWrapper mocks={mocks}>
    <RandomContinent timeUntilNav={TIMEOUT} />
  </TestWrapper>
);

const getContinentsList = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const continentsList = getContinentsList(wrapper);
  expect(continentsList.exists()).toBe(true);
  expect(continentsList.find('MuiCircularProgressCircle').exists()).toBe(true);
};

describe('RandomContinent', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getContinentsList(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('Shows random continent information when continents query resolves and before navigation', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    // wait half as long to ensure continent has been selected
    await updateWrapper(wrapper, TIMEOUT / 2);
    expect(getContinentsList(wrapper).find('ContinentCard').exists()).toBe(true);
  });

  test('Renders navigation component after desired number of seconds to navigate user to a random continent url', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper, 0);
    // wait twice as long to ensure rendering can complete
    await updateWrapper(wrapper, TIMEOUT * 2);
    const continentsList = getContinentsList(wrapper);
    expect(continentsList.find('ContinentCard').exists()).toBe(false);
    expect(continentsList.find('Navigate').prop('to')).toContain(`/${paths.CONTINENT}/code`);
  });
});
