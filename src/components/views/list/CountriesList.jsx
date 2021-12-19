import React from 'react';
import { useListCountriesQuery } from '../../../api/locations';
import defineBlock from '../../../utils/defineBlock';
import './CountriesList.scss';

const bem = defineBlock('CountriesList')

const CountriesList = () => {
  const { countries, countriesLoading, countriesError } = useListCountriesQuery()
  return (
    countries.map((country) => (
      <div key={country.code}>{country.name}</div>
    ))
  )
} 

export default CountriesList;