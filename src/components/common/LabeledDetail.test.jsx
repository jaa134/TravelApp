import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../utils/TestWrapper';
import LabeledDetail, { bem } from './LabeledDetail';

describe('LabeledDetail', () => {
  const detail = {
    label: 'foo',
    value: 'bar'
  };
  test('Shows label and value', () => {
    const wrapper = mount(
      <TestWrapper>
        <LabeledDetail label={detail.label} value={detail.value} />
      </TestWrapper>
    );
    const labeledDetail = wrapper.find(`.${bem()}`);
    expect(labeledDetail.exists()).toBeTruthy();
    expect(labeledDetail.find(`.${bem('label')}`).text()).toBe(detail.label);
    expect(labeledDetail.find(`.${bem('value')}`).text()).toBe(detail.value);
  });
});
