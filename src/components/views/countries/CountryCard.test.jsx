import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import CountryCard, { bem } from './CountryCard';

describe('CountryCard', () => {
  let country = null;

  const getWrapper = (showType) => mount(
    <TestWrapper>
      <CountryCard
        code={country.code}
        name={country.name}
        emoji={country.emoji}
        type={country.__typename}
        showType={showType}
      />
    </TestWrapper>
  );

  const validateBase = (countryCard) => {
    expect(countryCard.exists()).toBe(true);
    expect(countryCard.find(`div.${bem('name')}`).text()).toBe(country.name);
    expect(countryCard.find('FavoriteButton').exists()).toBe(true);
    expect(countryCard.find('CountryLink').exists()).toBe(true);
    expect(countryCard.find('FavoriteButton').at(0).prop('code')).toBe(country.code);
    expect(countryCard.find('FavoriteButton').at(0).prop('type')).toBe(country.__typename);
    expect(countryCard.find('CountryLink').at(0).prop('code')).toBe(country.code);
    expect(countryCard.find('CountryLink').at(0).prop('text')).toBe('Learn more');
  };

  beforeEach(() => {
    country = {
      code: 'foo',
      name: 'bar',
      emoji: '🇫🇷',
      __typename: 'MyType'
    };
  });

  test('Shows required data - without type', () => {
    const wrapper = getWrapper(false);
    const countryCard = wrapper.find(`.${bem()}`);
    validateBase(countryCard);
    expect(countryCard.find('LabeledDetail').at(0).prop('label')).toBe('Emoji');
    expect(countryCard.find('LabeledDetail').at(0).prop('value')).toBe(country.emoji);
    expect(countryCard.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(countryCard.find('LabeledDetail').at(1).prop('value')).toBe(country.code);
    expect(countryCard.find('LabeledDetail').at(2).exists()).toBe(false);
  });

  test('Shows required data - with type', () => {
    const wrapper = getWrapper(true);
    const countryCard = wrapper.find(`.${bem()}`);
    validateBase(countryCard);
    expect(countryCard.find('LabeledDetail').at(0).prop('label')).toBe('Type');
    expect(countryCard.find('LabeledDetail').at(0).prop('value')).toBe(country.__typename);
    expect(countryCard.find('LabeledDetail').at(1).prop('label')).toBe('Emoji');
    expect(countryCard.find('LabeledDetail').at(1).prop('value')).toBe(country.emoji);
    expect(countryCard.find('LabeledDetail').at(2).prop('label')).toBe('Code');
    expect(countryCard.find('LabeledDetail').at(2).prop('value')).toBe(country.code);
    expect(countryCard.find('LabeledDetail').at(3).exists()).toBe(false);
  });
});
