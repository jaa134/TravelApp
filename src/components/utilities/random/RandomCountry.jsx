import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { paths } from '../../../constants';
import { useListCountriesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import CountryCard from '../../views/countries/CountryCard';
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
    if (countries?.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setCountry(countries[randomIndex]);
      timer = setTimeout(() => {
        setShouldNavigate(true);
      }, timeUntilNav);
    }
    return () => clearTimeout(timer);
  }, [countries]);

  let content = null;
  if (countriesLoading) {
    content = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (countriesError) {
    content = <RequestErrorAlert />;
  } else if (shouldNavigate) {
    content = (
      <Navigate to={`/${paths.COUNTRY}/${country.code}`} />
    );
  } else if (country) {
    content = (
      <CountryCard
        code={country.code}
        name={country.name}
        emoji={country.emoji}
        type={country.__typename}
        showType
      />
    );
  }
  return (
    <div className={bem()}>
      {content}
    </div>
  );
};

RandomCountry.propTypes = {
  timeUntilNav: PropTypes.number.isRequired
};

export default RandomCountry;
