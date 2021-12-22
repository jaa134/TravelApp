import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useListLanguagesQuery } from '../../../api/lists';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import NoItemsAlert from '../../common/NoItemsAlert';
import { useFavorites } from '../../utilities/favorites/FavoritesProvider';
import LanguageCard from './LanguageCard';

export const bem = defineBlock('LanguagesList');

export const PAGE_SIZE = 30;
const CARD_HEIGHT = 153;

const LanguagesList = ({
  favoritesOnly
}) => {
  const { languages, languagesLoading, languagesError } = useListLanguagesQuery();
  const { favorites, isFavorite } = useFavorites();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [page, setPage] = useState(1);

  const normalizedLanguages = useMemo(
    () => (languages || [])
      .map((language) => ({
        ...language,
        normalName: language.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      }))
      .sort((a, b) => a.normalName.localeCompare(b.normalName)),
    [languages]
  );

  const filteredLanguages = useMemo(() => {
    let values = normalizedLanguages || [];
    if (favoritesOnly) {
      values = values
        .filter(({ code, __typename }) => isFavorite(code, __typename));
    }
    if (selectedLanguages.length) {
      const selectedLanguagesMap = selectedLanguages.reduce((acc, cur) => {
        acc[cur.code] = cur;
        return acc;
      }, {});
      values = values.filter(({ code }) => code in selectedLanguagesMap);
    }
    return values;
  }, [normalizedLanguages, favorites, selectedLanguages]);

  const displayedLanguages = useMemo(() => {
    const start = 0;
    const end = page * PAGE_SIZE;
    return filteredLanguages.slice(start, end);
  }, [filteredLanguages, page]);

  let content = null;
  if (languagesError) {
    content = <RequestErrorAlert />;
  } else {
    let options = null;
    let gridItems = null;
    if (languagesLoading) {
      options = [];
      gridItems = [...Array(PAGE_SIZE)].map((_, i) => ({
        key: i,
        component: (
          <Skeleton
            variant="rectangular"
            height={CARD_HEIGHT}
          />
        )
      }));
    } else {
      options = normalizedLanguages.map((language) => ({
        ...language,
        firstLetter: language.normalName[0].toUpperCase()
      }));
      gridItems = displayedLanguages.map((language) => ({
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

    let gridContent = null;
    if (gridItems.length === 0) {
      gridContent = <NoItemsAlert />;
    } else {
      gridContent = (
        <InfiniteScroll
          dataLength={displayedLanguages.length}
          next={() => { setPage(page + 1); }}
          hasMore={displayedLanguages.length < filteredLanguages.length}
          loader={(
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          )}
        >
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
        </InfiniteScroll>
      );
    }

    content = (
      <>
        <Autocomplete
          id="search-languages"
          multiple
          value={selectedLanguages}
          options={options.sort((a, b) => a.normalName.localeCompare(b.normalName))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          sx={{ marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label="Choose a language" />}
          onChange={(_, value) => {
            setPage(1);
            setSelectedLanguages(value);
          }}
        />
        {gridContent}
      </>
    );
  }
  return (
    <div className={bem()}>
      <PageTitle text="Languages" />
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
