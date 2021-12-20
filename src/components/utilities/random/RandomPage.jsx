import React from 'react';
import Typography from '@mui/material/Typography';
import RandomContinent from './RandomContinent';
import RandomCountry from './RandomCountry';
import RandomLanguage from './RandomLanguage';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import './RandomPage.scss';

const bem = defineBlock('RandomPage');

// Wait 3 seconds before navigation
const timeUntilNav = 3000;

const RandomPage = () => {
  const pages = [
    <RandomContinent timeUntilNav={timeUntilNav} />,
    <RandomCountry timeUntilNav={timeUntilNav} />,
    <RandomLanguage timeUntilNav={timeUntilNav} />
  ];
  const randomIndex = Math.floor(Math.random() * pages.length);
  return (
    <div className={bem()}>
      <PageTitle text="Random" />
      <Typography className={bem('subheader')} variant="h5" gutterBottom>
        Hold on tight! We are teleporting you to a random page.
      </Typography>
      {pages[randomIndex]}
    </div>
  );
};

export default RandomPage;
