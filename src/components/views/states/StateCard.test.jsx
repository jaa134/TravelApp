import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import StateCard, { bem } from './StateCard';

describe('StateCard', () => {
  let state = null;

  const getWrapper = (showType) => mount(
    <TestWrapper>
      <StateCard
        code={state.code}
        name={state.name}
        type={state.__typename}
        showType={showType}
      />
    </TestWrapper>
  );

  const validateBase = (stateCard) => {
    expect(stateCard.exists()).toBe(true);
    expect(stateCard.find(`div.${bem('name')}`).text()).toBe(state.name);
  };

  beforeEach(() => {
    state = {
      code: 'foo',
      name: 'bar',
      __typename: 'MyType'
    };
  });

  test('Shows required data - without type', () => {
    const wrapper = getWrapper(false);
    const stateCard = wrapper.find(`.${bem()}`);
    validateBase(stateCard);
    expect(stateCard.find('LabeledDetail').at(0).prop('label')).toBe('Code');
    expect(stateCard.find('LabeledDetail').at(0).prop('value')).toBe(state.code);
    expect(stateCard.find('LabeledDetail').at(1).exists()).toBe(false);
  });

  test('Shows required data - with type', () => {
    const wrapper = getWrapper(true);
    const stateCard = wrapper.find(`.${bem()}`);
    validateBase(stateCard);
    expect(stateCard.find('LabeledDetail').at(0).prop('label')).toBe('Type');
    expect(stateCard.find('LabeledDetail').at(0).prop('value')).toBe(state.__typename);
    expect(stateCard.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(stateCard.find('LabeledDetail').at(1).prop('value')).toBe(state.code);
    expect(stateCard.find('LabeledDetail').at(2).exists()).toBe(false);
  });
});
