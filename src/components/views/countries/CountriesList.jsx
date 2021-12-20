import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListCountriesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import { CountryLink } from '../../common/Links';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
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
      <table className={bem('table')}>
        <tbody>
          {countries.map((country) => (
            <tr key={country.code}>
              <td>
                <FavoriteButton code={country.code} type={country.__typename} />
              </td>
              <td className={bem('emoji')}>{country.emoji}</td>
              <td>{country.code}</td>
              <td>
                <CountryLink code={country.code} name={country.name} />
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
