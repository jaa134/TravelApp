import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useContinentDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import NotFoundAlert from '../../common/NotFoundAlert';
import { CountryLink } from '../../common/Links';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './ContinentDetails.scss';

const bem = defineBlock('ContinentDetails');

const ContinentDetails = () => {
  const params = useParams();
  const { continent, continentLoading, continentError } = useContinentDetailsQuery(params.id);
  let content = null;
  if (continentLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (continentError) {
    content = <NetworkErrorAlert />;
  } else if (!continent) {
    content = <NotFoundAlert />;
  } else {
    content = (
      <div className={bem('details')}>
        <Typography variant="subtitle1" gutterBottom component="div">
          Welcome to
          {' '}
          {continent.name}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          <dl>
            <dt>Favorite</dt>
            <dd>
              <FavoriteButton code={continent.code} type={continent.__typename} />
            </dd>
            <dt>Code</dt>
            <dd>{continent.code}</dd>
            <dt>Countries</dt>
            <dd>
              <ul>
                {continent.countries.map((country) => (
                  <li key={country.code}>
                    <CountryLink code={country.code} name={country.name} />
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </Typography>
      </div>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5" gutterBottom>Continent details</Typography>
      {content}
    </div>
  );
};

export default ContinentDetails;
