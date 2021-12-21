import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useListCountriesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import NoItemsAlert from '../../common/NoItemsAlert';
import { useFavorites } from '../../utilities/favorites/FavoritesProvider';
import CountryCard from './CountryCard';

export const bem = defineBlock('CountriesList');

export const NUM_LOADING_MOCKS = 15;
const CARD_HEIGHT = 182;

const CountriesList = ({
  favoritesOnly
}) => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery();
  const { favorites, isFavorite } = useFavorites();
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const normalizedCountries = useMemo(
    () => (countries || [])
      .map((country) => ({
        ...country,
        normalName: country.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      }))
      .sort((a, b) => a.normalName.localeCompare(b.normalName)),
    [countries]
  );

  const filteredCountries = useMemo(() => {
    let values = normalizedCountries || [];
    if (favoritesOnly) {
      values = values
        .filter(({ code, __typename }) => isFavorite(code, __typename));
    }
    if (selectedCountries.length) {
      const selectedCountriesMap = selectedCountries.reduce((acc, cur) => {
        acc[cur.code] = cur;
        return acc;
      }, {});
      values = values.filter(({ code }) => code in selectedCountriesMap);
    }
    return values;
  }, [normalizedCountries, favorites, selectedCountries]);

  const displayedCountries = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return filteredCountries.slice(start, end);
  }, [filteredCountries, page, pageSize]);

  const pageCount = Math.ceil(filteredCountries.length / pageSize);

  let content = null;
  if (countriesError) {
    content = <RequestErrorAlert />;
  } else {
    let options = null;
    let gridItems = null;
    if (countriesLoading) {
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
      options = normalizedCountries.map((country) => ({
        ...country,
        firstLetter: country.normalName[0].toUpperCase()
      }));
      gridItems = displayedCountries.map((country) => ({
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

    let gridContent = null;
    if (gridItems.length === 0) {
      gridContent = <NoItemsAlert />;
    } else {
      gridContent = (
        <Stack spacing={2}>
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
          {pageCount > 1 && (
            <Box sx={{ alignSelf: 'flex-end' }}>
              <Pagination
                count={pageCount}
                shape="rounded"
                size="large"
                page={page}
                onChange={(_, value) => { setPage(value); }}
              />
            </Box>
          )}
        </Stack>
      );
    }

    content = (
      <>
        <Autocomplete
          id="search-countries"
          multiple
          value={selectedCountries}
          options={options.sort((a, b) => a.normalName.localeCompare(b.normalName))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          sx={{ marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label="Choose a country" />}
          onChange={(_, value) => {
            setPage(1);
            setSelectedCountries(value);
          }}
        />
        {gridContent}
      </>
    );
  }
  return (
    <div className={bem()}>
      <PageTitle text="Countries" />
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
