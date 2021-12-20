import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { paths } from '../../constants';
import ContinentsList from '../views/continents/ContinentsList';
import ContinentDetails from '../views/continents/ContinentDetails';
import CountriesList from '../views/countries/CountriesList';
import CountryDetails from '../views/countries/CountryDetails';
import LanguagesList from '../views/languages/LanguagesList';
import LanguageDetails from '../views/languages/LanguageDetails';
import RandomPage from '../utilities/random/RandomPage';
import GraphqlIDE from '../utilities/graphiql/GraphqlIDE';
import Home from './Home';

const AppNavRoutes = () => (
  <Routes>
    <Route path={paths.HOME} element={<Home />} exact />
    <Route path={paths.CONTINENTS} element={<ContinentsList />} exact />
    <Route path={paths.COUNTRIES} element={<CountriesList />} exact />
    <Route path={paths.LANGUAGES} element={<LanguagesList />} exact />
    <Route path={paths.FAVORITES} element={<div />} exact />
    <Route path={paths.RANDOM} element={<RandomPage />} exact />
    <Route path={paths.GRAPHIQL} element={<GraphqlIDE />} exact />
    <Route path={`${paths.CONTINENT}/:id`} element={<ContinentDetails />} exact />
    <Route path={`${paths.COUNTRY}/:id`} element={<CountryDetails />} exact />
    <Route path={`${paths.LANGUAGE}/:id`} element={<LanguageDetails />} exact />
    <Route path="*" element={<Navigate replace to={paths.HOME} />} />
  </Routes>
);

export default AppNavRoutes;
