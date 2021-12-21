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

  beforeEach(() => {
    localStorage.clear();
  });

  // TODO: find out why the icon wont update even though you can see
  // state changing. Note, this is only a problem in tests.
  test.skip('Can toggle favorite and remembers state between component instances', async () => {
    // create a button and toggle it back and forth
    const props = { code: 'foo', type: 'bar' };
    let wrapper = getWrapper(props.code, props.type);
    let favoriteButton = wrapper.find(`.${bem()}`);
    expect(favoriteButton.exists()).toBeTruthy();
    expect(favoriteButton.find(favIconDefault).exists()).toBeTruthy();
    expect(favoriteButton.find(favIconActive).exists()).toBeFalsy();
    favoriteButton.find(favIconDefault).simulate('click');
    await updateWrapper(wrapper);
    expect(favoriteButton.find(favIconActive).exists()).toBeTruthy();
    expect(favoriteButton.find(favIconDefault).exists()).toBeFalsy();
    favoriteButton.find(favIconActive).simulate('click');
    await updateWrapper(wrapper);
    expect(favoriteButton.find(favIconDefault).exists()).toBeTruthy();
    expect(favoriteButton.find(favIconActive).exists()).toBeFalsy();

    // recreate the same instance and ensure it is still not favorited
    wrapper = getWrapper(props.code, props.type);
    favoriteButton = wrapper.find(`.${bem()}`);
    expect(favoriteButton.find(favIconDefault).exists()).toBeTruthy();
    expect(favoriteButton.find(favIconActive).exists()).toBeFalsy();

    // click the button to favorite
    favoriteButton.find(favIconDefault).simulate('click');
    await updateWrapper(wrapper);

    // recreate the same instance and ensure it is still favorited
    wrapper = getWrapper(props.code, props.type);
    favoriteButton = wrapper.find(`.${bem()}`);
    expect(favoriteButton.find(favIconActive).exists()).toBeTruthy();
    expect(favoriteButton.find(favIconDefault).exists()).toBeFalsy();

    // create a new button with different prop values and ensure it is not favorited
    wrapper = getWrapper('new', 'values');
    favoriteButton = wrapper.find(`.${bem()}`);
    expect(favoriteButton.find(favIconDefault).exists()).toBeTruthy();
    expect(favoriteButton.find(favIconActive).exists()).toBeFalsy();
  });
});
