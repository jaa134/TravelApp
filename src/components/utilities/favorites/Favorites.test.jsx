import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import Favorites from './Favorites';

jest.mock('../../views/continents/ContinentsList', () => ({
  __esModule: true,
  default: () => <div id="ContinentList" />
}));

jest.mock('../../views/countries/CountriesList', () => ({
  __esModule: true,
  default: () => <div id="CountriesList" />
}));

jest.mock('../../views/languages/LanguagesList', () => ({
  __esModule: true,
  default: () => <div id="LanguagesList" />
}));

const tabSelector = 'ForwardRef(Tab) button';

describe('Favorites', () => {
  test('Renders the correct tab content when switching tabs', async () => {
    const wrapper = mount(
      <TestWrapper>
        <Favorites />
      </TestWrapper>
    );

    // make sure all the tabs are there
    expect(wrapper.find(tabSelector)).toHaveLength(3);
    expect(wrapper.find(tabSelector).at(0).text()).toBe('Continents');
    expect(wrapper.find(tabSelector).at(1).text()).toBe('Countries');
    expect(wrapper.find(tabSelector).at(2).text()).toBe('Languages');

    // verify that continents is selected by default
    expect(wrapper.find('#ContinentList').exists()).toBe(true);
    expect(wrapper.find('#CountriesList').exists()).toBe(false);
    expect(wrapper.find('#LanguagesList').exists()).toBe(false);

    // select the  countries tab
    wrapper.find(tabSelector).at(1).simulate('click');
    await updateWrapper(wrapper);
    expect(wrapper.find('#ContinentList').exists()).toBe(false);
    expect(wrapper.find('#CountriesList').exists()).toBe(true);
    expect(wrapper.find('#LanguagesList').exists()).toBe(false);

    // select the languages tab
    wrapper.find(tabSelector).at(2).simulate('click');
    await updateWrapper(wrapper);
    expect(wrapper.find('#ContinentList').exists()).toBe(false);
    expect(wrapper.find('#CountriesList').exists()).toBe(false);
    expect(wrapper.find('#LanguagesList').exists()).toBe(true);

    // select the continents tab
    wrapper.find(tabSelector).at(0).simulate('click');
    await updateWrapper(wrapper);
    expect(wrapper.find('#ContinentList').exists()).toBe(true);
    expect(wrapper.find('#CountriesList').exists()).toBe(false);
    expect(wrapper.find('#LanguagesList').exists()).toBe(false);
  });
});
