import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useListLanguagesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import NoItemsAlert from '../../common/NoItemsAlert';
import { useFavorites } from '../../utilities/favorites/FavoritesProvider';
import LanguageCard from './LanguageCard';

export const bem = defineBlock('LanguagesList');

export const NUM_LOADING_MOCKS = 25;
const CARD_HEIGHT = 150;

const LanguagesList = ({
  favoritesOnly
}) => {
  const { languages, languagesLoading, languagesError } = useListLanguagesQuery();
  const { favorites, isFavorite } = useFavorites();
  const filteredLanguages = useMemo(() => {
    let values = languages;
    if (languages) {
      if (favoritesOnly) {
        values = values
          .filter(({ code, __typename }) => isFavorite(code, __typename));
      }
    }
    return values;
  }, [languages, favorites]);

  let content = null;
  if (languagesError) {
    content = <RequestErrorAlert />;
  } else {
    let gridItems = null;
    if (languagesLoading) {
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
      gridItems = filteredLanguages.map((language) => ({
        key: language.code,
        component: (
          <LanguageCard
            code={language.code}
            name={language.name}
            type={language.__typename}
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
      <Typography variant="h4" gutterBottom>Languages</Typography>
      {content}
    </div>
  );
};

LanguagesList.propTypes = {
  favoritesOnly: PropTypes.bool
};

LanguagesList.defaultProps = {
  favoritesOnly: false
};

export default LanguagesList;
