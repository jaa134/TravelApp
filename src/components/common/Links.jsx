import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { paths } from '../../constants';

export const ContinentsLink = () => (
  <Link to={`/${paths.CONTINENTS}`}>
    Continents
  </Link>
);

export const CountriesLink = () => (
  <Link to={`/${paths.COUNTRIES}`}>
    Countries
  </Link>
);

export const LanguagesLink = () => (
  <Link to={`/${paths.LANGUAGES}`}>
    Languages
  </Link>
);

const LinkDetailsPropTypes = {
  code: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export const ContinentLink = ({ code, text }) => (
  <Button component={Link} to={`/${paths.CONTINENT}/${code}`} size="small">
    {text}
  </Button>
);
ContinentLink.propTypes = LinkDetailsPropTypes;

export const CountryLink = ({ code, text }) => (
  <Button component={Link} to={`/${paths.COUNTRY}/${code}`} size="small">
    {text}
  </Button>
);
CountryLink.propTypes = LinkDetailsPropTypes;

export const LanguageLink = ({ code, text }) => (
  <Button component={Link} to={`/${paths.LANGUAGE}/${code}`} size="small">
    {text}
  </Button>
);
LanguageLink.propTypes = LinkDetailsPropTypes;
