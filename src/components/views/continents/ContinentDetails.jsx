import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { paths } from '../../../constants';
import { useContinentDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import './ContinentDetails.scss';

const bem = defineBlock('ContinentDetails');

const ContinentDetails = () => {
  const params = useParams();
  const { continent, continentLoading, continentError } = useContinentDetailsQuery(params.id);
  let content = null;
  if (continentLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (continentError) {
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
          {continent.name}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          <dl>
            <dt>Code</dt>
            <dd>{continent.code}</dd>
            <dt>Countries</dt>
            <dd>
              <ul>
                {continent.countries.map((country) => (
                  <li key={country.code}>
                    <Link to={`/${paths.COUNTRY}/${country.code}`}>
                      {country.name}
                    </Link>
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
