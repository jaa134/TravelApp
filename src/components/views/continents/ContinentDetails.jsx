import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useContinentDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import NotFoundAlert from '../../common/NotFoundAlert';
import LabeledDetail from '../../common/LabeledDetail';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import CountryCard from '../countries/CountryCard';
import './ContinentDetails.scss';

const bem = defineBlock('ContinentDetails');

const ContinentDetails = () => {
  const params = useParams();
  const { continent, continentLoading, continentError } = useContinentDetailsQuery(params.id);
  let content = null;
  if (continentLoading) {
    content = <CircularProgress />;
  } else if (continentError) {
    content = <NetworkErrorAlert />;
  } else if (!continent) {
    content = <NotFoundAlert />;
  } else {
    const favoriteButton = <FavoriteButton code={continent.code} type={continent.__typename} />;
    content = (
      <div className={bem('details')}>
        <Typography className={bem('subheader')} variant="h5" gutterBottom>
          {continent.name}
        </Typography>
        <LabeledDetail label="Favorite" value={favoriteButton} />
        <LabeledDetail label="Code" value={continent.code} />
        <Typography className={bem('list-title')} variant="h6">
          Countries
        </Typography>
        <Grid container spacing={2}>
          {continent.countries.map((country) => (
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
      </div>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h4" gutterBottom>Continent details</Typography>
      {content}
    </div>
  );
};

export default ContinentDetails;
