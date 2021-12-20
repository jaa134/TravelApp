import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useCountryDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import RequestErrorAlert from '../../common/RequestErrorAlert';
import NotFoundAlert from '../../common/NotFoundAlert';
import LabeledDetail from '../../common/LabeledDetail';
import FavoriteButton from '../../utilities/favorites/FavoriteButton';
import ContinentCard from '../continents/ContinentCard';
import StateCard from '../states/StateCard';
import LanguageCard from '../languages/LanguageCard';
import './CountryDetails.scss';

export const bem = defineBlock('CountryDetails');

const CountryDetails = () => {
  const params = useParams();
  const { country, countryLoading, countryError } = useCountryDetailsQuery(params.id);
  let content = null;
  if (countryLoading) {
    content = <CircularProgress />;
  } else if (countryError) {
    content = <RequestErrorAlert />;
  } else if (!country) {
    content = <NotFoundAlert />;
  } else {
    const favoriteButton = <FavoriteButton code={country.code} type={country.__typename} />;
    content = (
      <div className={bem('details')}>
        <Typography className={bem('subheader')} variant="h5" gutterBottom>
          {country.name}
        </Typography>
        <LabeledDetail label="Favorite" value={favoriteButton} />
        <LabeledDetail label="Emoji" value={country.emoji} />
        <LabeledDetail label="Code" value={country.code} />
        <LabeledDetail label="Native" value={country.native} />
        <LabeledDetail label="Phone" value={country.phone} />
        <LabeledDetail label="Currency" value={country.currency} />
        <LabeledDetail label="Capital" value={country.capital} />
        <Typography className={bem('list-title')} variant="h6">
          Continent
        </Typography>
        <Grid container spacing={2}>
          <Grid
            key={country.continent.code}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
          >
            <ContinentCard
              code={country.continent.code}
              name={country.continent.name}
              type={country.continent.__typename}
            />
          </Grid>
        </Grid>
        {country.states.length > 0 && (
          <>
            <Typography className={bem('list-title')} variant="h6">
              States
            </Typography>
            <Grid container spacing={2}>
              {country.states.map((state) => (
                <Grid
                  key={state.code}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <StateCard
                    code={state.code}
                    name={state.name}
                    type={state.__typename}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Typography className={bem('list-title')} variant="h6">
          Languages
        </Typography>
        <Grid container spacing={2}>
          {country.languages.map((language) => (
            <Grid
              key={language.code}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
            >
              <LanguageCard
                code={language.code}
                name={language.name}
                type={language.__typename}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  return (
    <div className={bem()}>
      <PageTitle text="Country details" />
      {content}
    </div>
  );
};

export default CountryDetails;
