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

const CountriesList = () => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery();
  let content = null;
  if (countriesLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (countriesError) {
    content = <NetworkErrorAlert />;
  } else {
    content = (
      <Grid container spacing={2}>
        {countries.map((country) => (
          <Grid
            key={country.code}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
          >
            <CountryCard
              code={country.code}
              name={country.name}
              emoji={country.emoji}
              type={country.__typename}
            />
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
