import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { paths } from '../../../../constants';
import { useListCountriesQuery } from '../../../../api/lists';
import defineBlock from '../../../../utils/defineBlock';
import NetworkErrorAlert from '../../../common/NetworkErrorAlert';
import './RandomCountry.scss';

const bem = defineBlock('RandomCountry');

const RandomCountry = ({
  timeUntilNav
}) => {
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
    content = <NetworkErrorAlert />;
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
        Teleporting you to a random country page!
      </Typography>
      {content}
    </div>
  );
};

RandomCountry.propTypes = {
  timeUntilNav: PropTypes.number.isRequired
};

export default RandomCountry;