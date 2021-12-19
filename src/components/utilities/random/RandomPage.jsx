import React from 'react';
import RandomContinent from './continent/RandomContinent';
import RandomCountry from './country/RandomCountry';
import RandomLanguage from './language/RandomLanguage';

// Wait 3 seconds before navigation
const timeUntilNav = 3000;

const RandomPage = () => {
  const pages = [
    <RandomContinent timeUntilNav={timeUntilNav} />,
    <RandomCountry timeUntilNav={timeUntilNav} />,
    <RandomLanguage timeUntilNav={timeUntilNav} />
  ];
  const randomIndex = Math.floor(Math.random() * pages.length);
  return pages[randomIndex];
};

export default RandomPage;
