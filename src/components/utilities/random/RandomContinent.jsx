import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { paths } from '../../../constants';
import { useListContinentsQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import ContinentCard from '../../views/continents/ContinentCard';
import './RandomContinent.scss';

const bem = defineBlock('RandomContinent');

const RandomContinent = ({
  timeUntilNav
}) => {
  const { continents, continentsLoading, continentsError } = useListContinentsQuery();
  const [continent, setContinent] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Once the number of continents changes, choose a random
  // continent and initiate a countdown for navigation
  useEffect(() => {
    let timer;
    if (continents?.length > 0) {
      const randomIndex = Math.floor(Math.random() * continents.length);
      setContinent(continents[randomIndex]);
      timer = setTimeout(() => {
        setShouldNavigate(true);
      }, timeUntilNav);
    }
    return () => clearTimeout(timer);
  }, [continents]);

  let content = null;
  if (continentsLoading) {
    content = (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (continentsError) {
    content = <NetworkErrorAlert />;
  } else if (shouldNavigate) {
    content = (
      <Navigate to={`/${paths.CONTINENT}/${continent.code}`} />
    );
  } else if (continent) {
    content = (
      <ContinentCard
        code={continent.code}
        name={continent.name}
        type={continent.__typename}
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

RandomContinent.propTypes = {
  timeUntilNav: PropTypes.number.isRequired
};

export default RandomContinent;
