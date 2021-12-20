import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useCountryDetailsQuery } from '../../../api/details';
import defineBlock from '../../../utils/defineBlock';
import NetworkErrorAlert from '../../common/NetworkErrorAlert';
import { ContinentLink, LanguageLink } from '../../common/Links';
import './CountryDetails.scss';

const bem = defineBlock('CountryDetails');

const CountryDetails = () => {
  const params = useParams();
  const { country, countryLoading, countryError } = useCountryDetailsQuery(params.id);
  let content = null;
  if (countryLoading) {
    content = <Skeleton variant="rectangular" height={200} />;
  } else if (countryError) {
    content = <NetworkErrorAlert />;
  } else {
    content = (
      <div className={bem('details')}>
        <Typography variant="subtitle1" gutterBottom component="div">
          Welcome to
          {' '}
          {country.name}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          <dl>
            <dt>Code</dt>
            <dd>{country.code}</dd>
            <dt>Flag</dt>
            <dd>{country.emoji}</dd>
            <dt>Native</dt>
            <dd>{country.native}</dd>
            <dt>Phone</dt>
            <dd>{country.phone}</dd>
            <dt>Continent</dt>
            <dd>
              <ContinentLink code={country.continent.code} name={country.continent.name} />
            </dd>
            <dt>Capital</dt>
            <dd>{country.capital}</dd>
            {country.states.length > 0 && (
              <>
                <dt>States</dt>
                <dd>
                  <ul>
                    {country.states.map((state) => (
                      <li key={state.code}>{state.name}</li>
                    ))}
                  </ul>
                </dd>
              </>
            )}
            <dt>Languages</dt>
            <dd>
              <ul>
                {country.languages.map((language) => (
                  <li key={language.code}>
                    <LanguageLink code={language.code} name={language.name} />
                  </li>
                ))}
              </ul>
            </dd>
            <dt>Currency</dt>
            <dd>{country.currency}</dd>
          </dl>
        </Typography>
      </div>
    );
  }
  return (
    <div className={bem()}>
      <Typography variant="h5" gutterBottom>Country details</Typography>
      {content}
    </div>
  );
};

export default CountryDetails;
