import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListCountriesQuery } from '../../../api/locations';
import defineBlock from '../../../utils/defineBlock';
import './CountriesList.scss';

const bem = defineBlock('CountriesList');

const CountriesList = () => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery();
  let content = null;
  if (countriesLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (countriesError) {
    content = (
      <Alert severity="error">
        <AlertTitle>Oops, something went wrong!</AlertTitle>
        Please contact the support team if this problem persists
      </Alert>
    );
  } else {
    content = (
      <table className={bem('table')}>
        {countries.map((country) => (
          <tr key={country.code}>
            <td className={bem('emoji')}>{country.emoji}</td>
            <td>{country.code}</td>
            <td>{country.name}</td>
          </tr>
        ))}
      </table>
    );
  }
  return (
    <div className={bem()}>
      {content}
    </div>
  );
};

export default CountriesList;
