import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useListContinentsQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import NoItemsAlert from '../../common/NoItemsAlert';
import { useFavorites } from '../../utilities/favorites/FavoritesProvider';
import ContinentCard from './ContinentCard';

export const bem = defineBlock('ContinentsList');

export const NUM_LOADING_MOCKS = 15;
const CARD_HEIGHT = 182;

const ContinentsList = ({
  favoritesOnly
}) => {
  const { continents, continentsLoading, continentsError } = useListContinentsQuery();
  const { favorites, isFavorite } = useFavorites();
  const [selectedContinents, setSelectedContinents] = useState([]);

  const normalizedContinents = useMemo(
    () => (continents || [])
      .map((continent) => ({
        ...continent,
        normalName: continent.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      }))
      .sort((a, b) => a.normalName.localeCompare(b.normalName)),
    [continents]
  );

  const filteredContinents = useMemo(() => {
    let values = normalizedContinents || [];
    if (favoritesOnly) {
      values = values
        .filter(({ code, __typename }) => isFavorite(code, __typename));
    }
    if (selectedContinents.length) {
      const selectedContinentsMap = selectedContinents.reduce((acc, cur) => {
        acc[cur.code] = cur;
        return acc;
      }, {});
      values = values.filter(({ code }) => code in selectedContinentsMap);
    }
    return values;
  }, [normalizedContinents, favorites, selectedContinents]);

  let content = null;
  if (continentsError) {
    content = <RequestErrorAlert />;
  } else {
    let options = null;
    let gridItems = null;
    if (continentsLoading) {
      options = [];
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
      options = normalizedContinents.map((continent) => ({
        ...continent,
        firstLetter: continent.normalName[0].toUpperCase()
      }));
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

    let gridContent = null;
    if (gridItems.length === 0) {
      gridContent = <NoItemsAlert />;
    } else {
      gridContent = (
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

    content = (
      <>
        <Autocomplete
          id="search-continents"
          multiple
          value={selectedContinents}
          options={options.sort((a, b) => a.normalName.localeCompare(b.normalName))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          sx={{ marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label="Choose a continent" />}
          onChange={(_, value) => { setSelectedContinents(value); }}
        />
        {gridContent}
      </>
    );
  }
  return (
    <div className={bem()}>
      <PageTitle text="Continents" />
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
