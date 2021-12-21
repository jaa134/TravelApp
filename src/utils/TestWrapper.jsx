import React from 'react';
import PropTypes from 'prop-types';
import { MockedProvider } from '@apollo/client/testing';
import FavoritesProvider from '../components/utilities/favorites/FavoritesProvider';

/**
 * The TestWrapper component provides all the necessary context
 * providers and utilities for testing TravelApp components.
 */
const TestWrapper = ({
  mocks,
  addTypename,
  children
}) => (
  <MockedProvider
    mocks={mocks}
    addTypename={addTypename}
  >
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  </MockedProvider>
);

TestWrapper.propTypes = {
  mocks: PropTypes.arrayOf(PropTypes.object),
  addTypename: PropTypes.bool,
  children: PropTypes.node.isRequired
};

TestWrapper.defaultProps = {
  mocks: [],
  addTypename: true
};

export default TestWrapper;
