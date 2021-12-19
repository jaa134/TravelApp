import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { paths } from '../../../constants';
import { useListCountriesQuery } from '../../../api/locations';
import defineBlock from '../../../utils/defineBlock';
import './RandomCountry.scss';

const bem = defineBlock('RandomCountry');

// Wait 3 seconds before navigation
const timeUntilNav = 3000;

const RandomCountry = () => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery();
  const [country, setCountry] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Once the number of countries changes, choose a random
  // country and initiate a countdown for navigation
  useEffect(() => {
    let timer;
    if (countries.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setCountry(countries[randomIndex]);
      timer = setTimeout(() => {
        setShouldNavigate(true);
      }, timeUntilNav);
    }
    return () => clearTimeout(timer);
  }, [countries.length]);

  let content = null;
  if (countriesLoading) {
    content = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (countriesError) {
    content = (
      <Alert severity="error">
        <AlertTitle>Oops, something went wrong!</AlertTitle>
        Please contact the support team if this problem persists
      </Alert>
    );
  } else if (shouldNavigate) {
    content = (
      <Navigate to={`/${paths.COUNTRY}/${country.code}`} />
    );
  } else if (country) {
    content = (
      <>
        <Typography variant="subtitle1">Hold on tight...</Typography>
        <Typography variant="body1">
          You are going to
          {' '}
          {country.emoji}
          {' '}
          {country.name}
        </Typography>
      </>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5">
        Teleporting you to a random country!
      </Typography>
      {content}
    </div>
  );
};

export default RandomCountry;
