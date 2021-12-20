import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListContinentsQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import { ContinentLink } from '../../common/Links';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import './ContinentsList.scss';

const bem = defineBlock('ContinentsList');

const ContinentsList = () => {
  const { continents, continentsLoading, continentsError } = useListContinentsQuery();
  let content = null;
  if (continentsLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (continentsError) {
    content = <NetworkErrorAlert />;
  } else {
    content = (
      <table className={bem('table')}>
        <tbody>
          {continents.map((continent) => (
            <tr key={continent.code}>
              <td>
                <FavoriteButton code={continent.code} type={continent.__typename} />
              </td>
              <td>{continent.code}</td>
              <td>
                <ContinentLink code={continent.code} text={continent.name} />
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
