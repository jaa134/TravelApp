import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { paths } from '../../../constants';
import { useListContinentsQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import './ContinentsList.scss';

const bem = defineBlock('ContinentsList');

const ContinentsList = () => {
  const { continents, continentsLoading, continentsError } = useListContinentsQuery();
  let content = null;
  if (continentsLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (continentsError) {
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
          {continents.map((continent) => (
            <tr key={continent.code}>
              <td>{continent.code}</td>
              <td>
                <Link to={`/${paths.CONTINENT}/${continent.code}`}>
                  {continent.name}
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
      <Typography variant="h5" gutterBottom>Continents</Typography>
      {content}
    </div>
  );
};

export default ContinentsList;
