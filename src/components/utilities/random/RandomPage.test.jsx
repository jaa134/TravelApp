import React from 'react';
import { shallow } from 'enzyme';
import RandomPage from './RandomPage';

const validateView = (wrapper, expectedView) => {
  expect(wrapper.find('RandomContinent').exists()).toBe(expectedView === 'RandomContinent');
  expect(wrapper.find('RandomCountry').exists()).toBe(expectedView === 'RandomCountry');
  expect(wrapper.find('RandomLanguage').exists()).toBe(expectedView === 'RandomLanguage');
};

describe('RandomPage', () => {
  test('Renders 1 of 3 different pages at random', () => {
    const original = Math.random;
    try {
      let wrapper;

      Math.random = jest.fn(() => 0);
      wrapper = shallow(<RandomPage />);
      validateView(wrapper, 'RandomContinent');

      Math.random = jest.fn(() => 0.5);
      wrapper = shallow(<RandomPage />);
      validateView(wrapper, 'RandomCountry');

      Math.random = jest.fn(() => 0.99999);
      wrapper = shallow(<RandomPage />);
      validateView(wrapper, 'RandomLanguage');
    } finally {
      Math.random = original;
    }
  });
});
