import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import LanguageCard, { bem } from './LanguageCard';

describe('LanguageCard', () => {
  let language = null;

  const getWrapper = (showType) => mount(
    <TestWrapper>
      <LanguageCard
        code={language.code}
        name={language.name}
        type={language.__typename}
        showType={showType}
      />
    </TestWrapper>
  );

  const validateBase = (languageCard) => {
    expect(languageCard.exists()).toBe(true);
    expect(languageCard.find(`div.${bem('name')}`).text()).toBe(language.name);
    expect(languageCard.find('FavoriteButton').exists()).toBe(true);
    expect(languageCard.find('LanguageLink').exists()).toBe(true);
    expect(languageCard.find('FavoriteButton').at(0).prop('code')).toBe(language.code);
    expect(languageCard.find('FavoriteButton').at(0).prop('type')).toBe(language.__typename);
    expect(languageCard.find('LanguageLink').at(0).prop('code')).toBe(language.code);
    expect(languageCard.find('LanguageLink').at(0).prop('text')).toBe('Learn more');
  };

  beforeEach(() => {
    language = {
      code: 'foo',
      name: 'bar',
      __typename: 'MyType'
    };
  });

  test('Shows required data - without type', () => {
    const wrapper = getWrapper(false);
    const languageCard = wrapper.find(`.${bem()}`);
    validateBase(languageCard);
    expect(languageCard.find('LabeledDetail').at(0).prop('label')).toBe('Code');
    expect(languageCard.find('LabeledDetail').at(0).prop('value')).toBe(language.code);
    expect(languageCard.find('LabeledDetail').at(1).exists()).toBe(false);
  });

  test('Shows required data - with type', () => {
    const wrapper = getWrapper(true);
    const languageCard = wrapper.find(`.${bem()}`);
    validateBase(languageCard);
    expect(languageCard.find('LabeledDetail').at(0).prop('label')).toBe('Type');
    expect(languageCard.find('LabeledDetail').at(0).prop('value')).toBe(language.__typename);
    expect(languageCard.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(languageCard.find('LabeledDetail').at(1).prop('value')).toBe(language.code);
    expect(languageCard.find('LabeledDetail').at(2).exists()).toBe(false);
  });
});
