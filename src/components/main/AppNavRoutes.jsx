import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { paths } from '../../constants';

const Home = lazy(() => import(
  /* webpackChunkName: "Home", webpackPrefetch: true */
  './Home'
));
const ContinentsList = lazy(() => import(
  /* webpackChunkName: "ContinentsList", webpackPrefetch: true */
  '../views/continents/ContinentsList'
));
const ContinentDetails = lazy(() => import(
  /* webpackChunkName: "ContinentDetails", webpackPrefetch: true */
  '../views/continents/ContinentDetails'
));
const CountriesList = lazy(() => import(
  /* webpackChunkName: "CountriesList", webpackPrefetch: true */
  '../views/countries/CountriesList'
));
const CountryDetails = lazy(() => import(
  /* webpackChunkName: "CountryDetails", webpackPrefetch: true */
  '../views/countries/CountryDetails'
));
const LanguagesList = lazy(() => import(
  /* webpackChunkName: "LanguagesList", webpackPrefetch: true */
  '../views/languages/LanguagesList'
));
const LanguageDetails = lazy(() => import(
  /* webpackChunkName: "LanguageDetails", webpackPrefetch: true */
  '../views/languages/LanguageDetails'
));
const Favorites = lazy(() => import(
  /* webpackChunkName: "Favorites", webpackPrefetch: true */
  '../utilities/favorites/Favorites'
));
const RandomPage = lazy(() => import(
  /* webpackChunkName: "RandomPage", webpackPrefetch: true */
  '../utilities/random/RandomPage'
));
const TourPage = lazy(() => import(
  /* webpackChunkName: "TourPage", webpackPrefetch: true */
  '../utilities/tour/TourPage'
));
const GraphqlIDE = lazy(() => import(
  /* webpackChunkName: "GraphqlIDE", webpackPrefetch: true */
  '../utilities/graphiql/GraphqlIDE'
));

const AppNavRoutes = () => (
  <Suspense fallback={(
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )}
  >
    <Routes>
      <Route path={paths.HOME} element={<Home />} exact />
      <Route path={paths.CONTINENTS} element={<ContinentsList />} exact />
      <Route path={paths.COUNTRIES} element={<CountriesList />} exact />
      <Route path={paths.LANGUAGES} element={<LanguagesList />} exact />
      <Route path={paths.FAVORITES} element={<Favorites />} exact />
      <Route path={paths.RANDOM} element={<RandomPage />} exact />
      <Route path={paths.TOUR} element={<TourPage />} exact />
      <Route path={paths.GRAPHIQL} element={<GraphqlIDE />} exact />
      <Route path={`${paths.CONTINENT}/:id`} element={<ContinentDetails />} exact />
      <Route path={`${paths.COUNTRY}/:id`} element={<CountryDetails />} exact />
      <Route path={`${paths.LANGUAGE}/:id`} element={<LanguageDetails />} exact />
      <Route path="*" element={<Navigate replace to={paths.HOME} />} />
    </Routes>
  </Suspense>
);

export default AppNavRoutes;
