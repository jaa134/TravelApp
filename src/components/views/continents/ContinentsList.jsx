import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListContinentsQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import NoItemsAlert from '../../common/NoItemsAlert';
import { useFavorites } from '../../utilities/favorites/FavoritesProvider';
import ContinentCard from './ContinentCard';

const bem = defineBlock('ContinentsList');

const NUM_LOADING_MOCKS = 7;
const CARD_HEIGHT = 142;

const ContinentsList = ({
  favoritesOnly
}) => {
  const { continents, continentsLoading, continentsError } = useListContinentsQuery();
  const { favorites, isFavorite } = useFavorites();
  const filteredContinents = useMemo(() => {
    let values = continents;
    if (continents) {
      if (favoritesOnly) {
        values = values
          .filter(({ code, __typename }) => isFavorite(code, __typename));
      }
    }
    return values;
  }, [continents, favorites]);

  let content = null;
  if (continentsError) {
    content = <NetworkErrorAlert />;
  } else {
    let gridItems = null;
    if (continentsLoading) {
      gridItems = [...Array(NUM_LOADING_MOCKS)].map((_, i) => ({
        key: i,
        component: (
          <Skeleton
            variant="rectangular"
            height={CARD_HEIGHT}
          />
        )
      }));
    } else {
      gridItems = filteredContinents.map((continent) => ({
        key: continent.code,
        component: (
          <ContinentCard
            code={continent.code}
            name={continent.name}
            type={continent.__typename}
          />
        )
      }));
    }

    if (gridItems.length === 0) {
      content = <NoItemsAlert />;
    } else {
      content = (
        <Grid container spacing={2}>
          {gridItems.map((item) => (
            <Grid
              key={item.key}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
            >
              {item.component}
            </Grid>
          ))}
        </Grid>
      );
    }
  }
  return (
    <div className={bem()}>
      <Typography variant="h4" gutterBottom>Continents</Typography>
      {content}
    </div>
  );
};

ContinentsList.propTypes = {
  favoritesOnly: PropTypes.bool
};

ContinentsList.defaultProps = {
  favoritesOnly: false
};

export default ContinentsList;
