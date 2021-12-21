import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import StateCard, { bem } from './StateCard';

describe('StateCard', () => {
  const state = {
    code: 'foo',
    name: 'bar',
    __typename: 'MyType'
  };
  test('Shows required data - without type', () => {
    const wrapper = mount(
      <TestWrapper>
        <StateCard
          code={state.code}
          name={state.name}
          type={state.__typename}
        />
      </TestWrapper>
    );
    const stateCard = wrapper.find(`.${bem()}`);
    expect(stateCard.exists()).toBeTruthy();
    expect(stateCard.find('LabeledDetail').at(0).prop('label')).toBe('Code');
    expect(stateCard.find('LabeledDetail').at(0).prop('value')).toBe(state.code);
    expect(stateCard.find('LabeledDetail').at(1).exists()).toBeFalsy();
  });

  test('Shows required data - with type', () => {
    const wrapper = mount(
      <TestWrapper>
        <StateCard
          code={state.code}
          name={state.name}
          type={state.__typename}
          showType
        />
      </TestWrapper>
    );
    const stateCard = wrapper.find(`.${bem()}`);
    expect(stateCard.exists()).toBeTruthy();
    expect(stateCard.find('LabeledDetail').at(0).prop('label')).toBe('Type');
    expect(stateCard.find('LabeledDetail').at(0).prop('value')).toBe(state.__typename);
    expect(stateCard.find('LabeledDetail').at(1).prop('label')).toBe('Code');
    expect(stateCard.find('LabeledDetail').at(1).prop('value')).toBe(state.code);
    expect(stateCard.find('LabeledDetail').at(2).exists()).toBeFalsy();
  });
});
