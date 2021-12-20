import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import ContinentCard, { bem } from './ContinentCard';

describe('ContinentCard', () => {
  let continent = null;

  const getWrapper = (showType) => mount(
    <TestWrapper>
      <ContinentCard
        code={continent.code}
        name={continent.name}
        type={continent.__typename}
        showType={showType}
      />
    </TestWrapper>
  );

  const validateBase = (continentCard) => {
    expect(continentCard.exists()).toBe(true);
    expect(continentCard.find(`div.${bem('name')}`).text()).toBe(continent.name);
    expect(continentCard.find('FavoriteButton').exists()).toBe(true);
    expect(continentCard.find('ContinentLink').exists()).toBe(true);
    expect(continentCard.find('FavoriteButton').at(0).prop('code')).toBe(continent.code);
    expect(continentCard.find('FavoriteButton').at(0).prop('type')).toBe(continent.__typename);
    expect(continentCard.find('ContinentLink').at(0).prop('code')).toBe(continent.code);
    expect(continentCard.find('ContinentLink').at(0).prop('text')).toBe('Learn more');
  };

  beforeEach(() => {
    continent = {
      code: 'foo',
      name: 'bar',
      __typename: 'MyType'
    };
  });

  test('Shows required data - without type', () => {
    const wrapper = getWrapper(false);
    const continentCard = wrapper.find(`.${bem()}`);
    validateBase(continentCard);
    expect(continentCard.find('LabeledDetail').at(0).prop('label')).toBe('Code');
    expect(continentCard.find('LabeledDetail').at(0).prop('value')).toBe(continent.code);
    expect(continentCard.find('LabeledDetail').at(1).exists()).toBe(false);
  });

  test('Shows required data - with type', () => {
    const wrapper = getWrapper(true);
    const continentCard = wrapper.find(`.${bem()}`);
    validateBase(continentCard);
    expect(continentCard.find('LabeledDetail').at(0).prop('label')).toBe('Type');
    expect(continentCard.find('LabeledDetail').at(0).prop('value')).toBe(continent.__typename);
    expect(continentCard.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(continentCard.find('LabeledDetail').at(1).prop('value')).toBe(continent.code);
    expect(continentCard.find('LabeledDetail').at(2).exists()).toBe(false);
  });
});
