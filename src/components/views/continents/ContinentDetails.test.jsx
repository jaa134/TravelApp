import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { DETAILS_CONTINENT } from '../../../api/details';
import ContinentDetails, { bem } from './ContinentDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: 'MC' }))
}));

const getCountries = (i) => ({
  name: `name${i}`,
  code: `code${i}`,
  emoji: `emoji${i}`,
  __typename: 'Country'
});

const countries = [...new Array(3)].map((_, i) => getCountries(i));

const continent = {
  code: 'MC',
  name: 'MyContinent',
  countries,
  __typename: 'Continent'
};

const normalMock = {
  request: {
    query: DETAILS_CONTINENT,
    variables: { code: continent.code }
  },
  result: {
    data: {
      continent
    }
  }
};

const errorMock = {
  request: {
    query: DETAILS_CONTINENT,
    variables: { code: continent.code }
  },
  error: new Error('something bad happened')
};

const emptyMock = {
  request: {
    query: DETAILS_CONTINENT,
    variables: { code: continent.code }
  },
  result: {
    data: {
      continent: null
    }
  }
};

const getWrapper = (mocks) => mount(
  <TestWrapper mocks={mocks}>
    <ContinentDetails />
  </TestWrapper>
);

const getContinentDetails = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const continentDetails = getContinentDetails(wrapper);
  expect(continentDetails.exists()).toBe(true);
  expect(continentDetails.find('MuiCircularProgressCircle').exists()).toBe(true);
};

describe('ContinentDetails', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getContinentDetails(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('Error component is displayed when url param results in no data', async () => {
    const wrapper = getWrapper([emptyMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getContinentDetails(wrapper).find('NotFoundAlert').exists()).toBe(true);
  });

  test('Continent details render after query returns data and inlcudes cards for the continent\'s countries', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const continentDetails = getContinentDetails(wrapper);
    expect(continentDetails.find(`h5.${bem('subheader')}`).text()).toBe(continent.name);
    expect(continentDetails.find('LabeledDetail').at(0).prop('label')).toBe('Favorite');
    expect(continentDetails.find('LabeledDetail').at(0).find('FavoriteButton').exists()).toBe(true);
    expect(continentDetails.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(continentDetails.find('LabeledDetail').at(1).prop('value')).toBe(continent.code);

    const countryCard = continentDetails.find('CountryCard');
    expect(countryCard).toHaveLength(countries.length);
    expect(countryCard.at(0).prop('code')).toBe(countries[0].code);
    expect(countryCard.at(1).prop('code')).toBe(countries[1].code);
    expect(countryCard.at(2).prop('code')).toBe(countries[2].code);
  });
});
