// Store favorites in local storage as a hash map. Hash is a combination
// of typename and code. This guarentees uniqueness across all data types.
// TODO: do we care about order? Should this be an array instead?
// { <type>-<code>: true }

import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const FAVORITES_STORAGE_KEY = 'myFavorites';

export const getItemmKey = (code, type) => `${type}-${code}`;

const getFavoritesFromLocalStorage = () => {
  let result = {};
  const storedData = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (storedData) {
    result = JSON.parse(storedData);
  }
  return result;
};

const setFavoritesInLocalStorage = (favorites) => {
  const dataToStore = JSON.stringify(favorites);
  localStorage.setItem(FAVORITES_STORAGE_KEY, dataToStore);
};

const useFavoritesStorage = () => {
  // Provide a function to useState so getFavoritesFromLocalStorage
  // is only called once during state initialization
  const [favorites, setFavorites] = useState(() => getFavoritesFromLocalStorage());

  const isFavorite = (code, type) => {
    const key = getItemmKey(code, type);
    return key in favorites;
  };

  const addFavorite = (code, type) => {
    setFavorites((prev) => {
      const result = { ...prev, [getItemmKey(code, type)]: true };
      setFavoritesInLocalStorage(result);
      return result;
    });
  };

  const removeFavorite = (code, type) => {
    setFavorites((prev) => {
      const { [getItemmKey(code, type)]: value, ...result } = prev;
      setFavoritesInLocalStorage(result);
      return result;
    });
  };

  const clearFavorites = () => {
    setFavorites({});
    setFavoritesInLocalStorage({});
  };

  return {
    isFavorite, addFavorite, removeFavorite, clearFavorites
  };
};

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

const FavoritesProvider = ({ children }) => {
  const value = useFavoritesStorage();
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default FavoritesProvider;
