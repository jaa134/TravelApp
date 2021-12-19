import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { paths } from '../../../constants';
import { useListCountriesQuery } from '../../../api/lists';
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
        <tbody>
          {countries.map((country) => (
            <tr key={country.code}>
              <td className={bem('emoji')}>{country.emoji}</td>
              <td>{country.code}</td>
              <td>
                <Link to={`/${paths.COUNTRY}/${country.code}`}>
                  {country.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5" gutterBottom>Countries</Typography>
      {content}
    </div>
  );
};

export default CountriesList;
