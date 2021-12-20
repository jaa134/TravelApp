import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import { DETAILS_COUNTRY } from '../../../api/details';
import CountryDetails, { bem } from './CountryDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: 'MC' }))
}));

const getStates = (i) => ({
  name: `name${i}`,
  code: `code${i}`,
  __typename: 'State'
});

const states = [...new Array(3)].map((_, i) => getStates(i));

const getLanguages = (i) => ({
  name: `name${i}`,
  code: `code${i}`,
  __typename: 'Language'
});

const languages = [...new Array(3)].map((_, i) => getLanguages(i));

const continent = {
  code: 'MC',
  name: 'MyContinent',
  __typename: 'Continent'
};

const country = {
  code: 'MC',
  name: 'MyCountry',
  native: 'FooBar',
  phone: '376',
  continent,
  capital: 'MyCapital',
  states,
  emoji: '🇫🇷',
  languages,
  currency: 'MyCurrency',
  __typename: 'Country'
};

const normalMock = {
  request: {
    query: DETAILS_COUNTRY,
    variables: { code: country.code }
  },
  result: {
    data: {
      country
    }
  }
};

const errorMock = {
  request: {
    query: DETAILS_COUNTRY,
    variables: { code: country.code }
  },
  error: new Error('something bad happened')
};

const emptyMock = {
  request: {
    query: DETAILS_COUNTRY,
    variables: { code: country.code }
  },
  result: {
    data: {
      country: null
    }
  }
};

const getWrapper = (mocks) => mount(
  <TestWrapper mocks={mocks}>
    <CountryDetails />
  </TestWrapper>
);

const getCountryDetails = (wrapper) => wrapper.find(`.${bem()}`);

const validateLoading = (wrapper) => {
  // validate loading component is displayed while query is in loading state
  const countryDetails = getCountryDetails(wrapper);
  expect(countryDetails.exists()).toBe(true);
  expect(countryDetails.find('MuiCircularProgressCircle').exists()).toBe(true);
};

describe('CountryDetails', () => {
  test('Error component is displayed while query is in error state', async () => {
    const wrapper = getWrapper([errorMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getCountryDetails(wrapper).find('RequestErrorAlert').exists()).toBe(true);
  });

  test('Error component is displayed when url param results in no data', async () => {
    const wrapper = getWrapper([emptyMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    expect(getCountryDetails(wrapper).find('NotFoundAlert').exists()).toBe(true);
  });

  test('Country details render after query returns data and inlcudes cards for the country\'s countries', async () => {
    const wrapper = getWrapper([normalMock]);
    validateLoading(wrapper);
    await updateWrapper(wrapper);
    const countryDetails = getCountryDetails(wrapper);
    expect(countryDetails.find(`h5.${bem('subheader')}`).text()).toBe(country.name);
    expect(countryDetails.find('LabeledDetail').at(0).prop('label')).toBe('Favorite');
    expect(countryDetails.find('LabeledDetail').at(0).find('FavoriteButton').exists()).toBe(true);
    expect(countryDetails.find('LabeledDetail').at(1).prop('label')).toBe('Emoji');
    expect(countryDetails.find('LabeledDetail').at(1).prop('value')).toBe(country.emoji);
    expect(countryDetails.find('LabeledDetail').at(2).prop('label')).toBe('Code');
    expect(countryDetails.find('LabeledDetail').at(2).prop('value')).toBe(country.code);
    expect(countryDetails.find('LabeledDetail').at(3).prop('label')).toBe('Native');
    expect(countryDetails.find('LabeledDetail').at(3).prop('value')).toBe(country.native);
    expect(countryDetails.find('LabeledDetail').at(4).prop('label')).toBe('Phone');
    expect(countryDetails.find('LabeledDetail').at(4).prop('value')).toBe(country.phone);
    expect(countryDetails.find('LabeledDetail').at(5).prop('label')).toBe('Currency');
    expect(countryDetails.find('LabeledDetail').at(5).prop('value')).toBe(country.currency);
    expect(countryDetails.find('LabeledDetail').at(6).prop('label')).toBe('Capital');
    expect(countryDetails.find('LabeledDetail').at(6).prop('value')).toBe(country.capital);

    const continentCard = countryDetails.find('ContinentCard');
    expect(continentCard).toHaveLength(1);
    expect(continentCard.at(0).prop('code')).toBe(continent.code);

    const stateCard = countryDetails.find('StateCard');
    expect(stateCard).toHaveLength(states.length);
    expect(stateCard.at(0).prop('code')).toBe(states[0].code);
    expect(stateCard.at(1).prop('code')).toBe(states[1].code);
    expect(stateCard.at(2).prop('code')).toBe(states[2].code);

    const languageCard = countryDetails.find('LanguageCard');
    expect(languageCard).toHaveLength(languages.length);
    expect(languageCard.at(0).prop('code')).toBe(languages[0].code);
    expect(languageCard.at(1).prop('code')).toBe(languages[1].code);
    expect(languageCard.at(2).prop('code')).toBe(languages[2].code);
  });
});
