import React from 'react';
import { mount } from 'enzyme';
import TestWrapper from '../../../utils/TestWrapper';
import updateWrapper from '../../../utils/updateWrapper';
import FavoriteButton, { bem } from './FavoriteButton';

describe('FavoriteButton', () => {
  const favIconDefault = 'svg[data-testid="FavoriteBorderIcon"]';
  const favIconActive = 'svg[data-testid="FavoriteIcon"]';

  const getWrapper = (code, type) => mount(
    <TestWrapper>
      <FavoriteButton code={code} type={type} />
    </TestWrapper>
  );

  const getFavoriteButton = (wrapper) => wrapper.find(`.${bem()}`);

  beforeEach(() => {
    localStorage.clear();
  });

  test('Can toggle favorite and remembers state between component instances', async () => {
    // create a button and toggle it back and forth
    const props = { code: 'foo', type: 'bar' };
    let wrapper = getWrapper(props.code, props.type);
    expect(getFavoriteButton(wrapper).exists()).toBe(true);

    // ensure the button is not favorited
    expect(getFavoriteButton(wrapper).find(favIconDefault).exists()).toBe(true);
    expect(getFavoriteButton(wrapper).find(favIconActive).exists()).toBe(false);

    // click the button to favorite
    getFavoriteButton(wrapper).find(favIconDefault).simulate('click');
    await updateWrapper(wrapper);

    // ensure the button is favorited
    expect(getFavoriteButton(wrapper).find(favIconActive).exists()).toBe(true);
    expect(getFavoriteButton(wrapper).find(favIconDefault).exists()).toBe(false);

    // click the button to unfavorite
    getFavoriteButton(wrapper).find(favIconActive).simulate('click');
    await updateWrapper(wrapper);

    // ensure the button is not favorited
    expect(getFavoriteButton(wrapper).find(favIconDefault).exists()).toBe(true);
    expect(getFavoriteButton(wrapper).find(favIconActive).exists()).toBe(false);

    // recreate the same instance and ensure it is still not favorited
    wrapper = getWrapper(props.code, props.type);
    expect(getFavoriteButton(wrapper).find(favIconDefault).exists()).toBe(true);
    expect(getFavoriteButton(wrapper).find(favIconActive).exists()).toBe(false);

    // click the button to favorite
    getFavoriteButton(wrapper).find(favIconDefault).simulate('click');
    await updateWrapper(wrapper);

    // recreate the same instance and ensure it is still favorited
    wrapper = getWrapper(props.code, props.type);
    expect(getFavoriteButton(wrapper).find(favIconActive).exists()).toBe(true);
    expect(getFavoriteButton(wrapper).find(favIconDefault).exists()).toBe(false);

    // create a new button with different prop values and ensure it is not favorited
    wrapper = getWrapper('new', 'values');
    expect(getFavoriteButton(wrapper).find(favIconDefault).exists()).toBe(true);
    expect(getFavoriteButton(wrapper).find(favIconActive).exists()).toBe(false);
  });
});
