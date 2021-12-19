// TODO: split Test configuration into a separate file. Move
// enzyme adapter, and jsdom registration into a shared file
// for use by every test.

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jsdom-global/register';
import App, { bem as appBem } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

});
