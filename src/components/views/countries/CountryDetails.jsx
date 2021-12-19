import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { paths } from '../../../constants';
import { useCountryDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import './CountryDetails.scss';

const bem = defineBlock('CountryDetails');

const CountryDetails = () => {
  const params = useParams();
  const { country, countryLoading, countryError } = useCountryDetailsQuery(params.id);
  let content = null;
  if (countryLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (countryError) {
    content = (
      <Alert severity="error">
        <AlertTitle>Oops, something went wrong!</AlertTitle>
        Please contact the support team if this problem persists
      </Alert>
    );
  } else {
    content = (
      <div className={bem('details')}>
        <Typography variant="subtitle1" gutterBottom component="div">
          Welcome to
          {' '}
          {country.name}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          <dl>
            <dt>Code</dt>
            <dd>{country.code}</dd>
            <dt>Flag</dt>
            <dd>{country.emoji}</dd>
            <dt>Native</dt>
            <dd>{country.native}</dd>
            <dt>Phone</dt>
            <dd>{country.phone}</dd>
            <dt>Continent</dt>
            <dd>
              <Link to={`/${paths.CONTINENT}/${country.continent.code}`}>
                {country.continent.name}
              </Link>
            </dd>
            <dt>Capital</dt>
            <dd>{country.capital}</dd>
            <dt>Currency</dt>
            <dd>{country.currency}</dd>
          </dl>
        </Typography>
      </div>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5" gutterBottom>Country details</Typography>
      {content}
    </div>
  );
};

export default CountryDetails;
