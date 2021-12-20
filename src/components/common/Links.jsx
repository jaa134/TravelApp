import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  name: PropTypes.string.isRequired
};

export const ContinentLink = ({ code, name }) => (
  <Link to={`/${paths.CONTINENT}/${code}`}>
    {name}
  </Link>
);
ContinentLink.propTypes = LinkDetailsPropTypes;

export const CountryLink = ({ code, name }) => (
  <Link to={`/${paths.COUNTRY}/${code}`}>
    {name}
  </Link>
);
CountryLink.propTypes = LinkDetailsPropTypes;

export const LanguageLink = ({ code, name }) => (
  <Link to={`/${paths.LANGUAGE}/${code}`}>
    {name}
  </Link>
);
LanguageLink.propTypes = LinkDetailsPropTypes;
