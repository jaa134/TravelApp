import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListCountriesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import NoItemsAlert from '../../common/NoItemsAlert';
import { useFavorites } from '../../utilities/favorites/FavoritesProvider';
import CountryCard from './CountryCard';

const bem = defineBlock('CountriesList');

const NUM_LOADING_MOCKS = 25;
const CARD_HEIGHT = 142;

const CountriesList = ({
  favoritesOnly
}) => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery();
  const { favorites, isFavorite } = useFavorites();
  const filteredCountries = useMemo(() => {
    let values = countries;
    if (countries) {
      if (favoritesOnly) {
        values = values
          .filter(({ code, __typename }) => isFavorite(code, __typename));
      }
    }
    return values;
  }, [countries, favorites]);

  let content = null;
  if (countriesError) {
    content = <NetworkErrorAlert />;
  } else {
    let gridItems = null;
    if (countriesLoading) {
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
      gridItems = filteredCountries.map((country) => ({
        key: country.code,
        component: (
          <CountryCard
            code={country.code}
            name={country.name}
            emoji={country.emoji}
            type={country.__typename}
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
      <Typography variant="h4" gutterBottom>Countries</Typography>
      {content}
    </div>
  );
};

CountriesList.propTypes = {
  favoritesOnly: PropTypes.bool
};

CountriesList.defaultProps = {
  favoritesOnly: false
};

export default CountriesList;
