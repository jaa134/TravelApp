import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListCountriesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import CountryCard from './CountryCard';
import './CountriesList.scss';

const bem = defineBlock('CountriesList');

const NUM_LOADING_MOCKS = 100;
const CARD_HEIGHT = 178;

const CountriesList = () => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery();
  let content = null;
  if (countriesError) {
    content = <NetworkErrorAlert />;
  } else {
    let gridItems = null;
    if (countriesLoading) {
      gridItems = [...Array(NUM_LOADING_MOCKS)].map((_, i) => ({
        key: i,
        component: (
          <Skeleton
            variant="rectangular"
            height={CARD_HEIGHT}
          />
        )
      }));
    } else {
      gridItems = countries.map((country) => ({
        key: country.code,
        component: (
          <CountryCard
            code={country.code}
            name={country.name}
            emoji={country.emoji}
            type={country.__typename}
          />
        )
      }));
    }
    content = (
      <Grid container spacing={2}>
        {gridItems.map((item) => (
          <Grid
            key={item.key}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
          >
            {item.component}
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h4" gutterBottom>Countries</Typography>
      {content}
    </div>
  );
};

export default CountriesList;
