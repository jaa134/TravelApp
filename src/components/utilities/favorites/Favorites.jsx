import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';
import ContinentsList from '../../views/continents/ContinentsList';
import CountriesList from '../../views/countries/CountriesList';
import LanguagesList from '../../views/languages/LanguagesList';
import FavoritesPanel from './FavoritesPanel';

const bem = defineBlock('Favorites');

const Favorites = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div className={bem()}>
      <PageTitle text="Favorites" />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Continents" />
          <Tab label="Countries" />
          <Tab label="Languages" />
        </Tabs>
      </Box>
      <FavoritesPanel value={selectedTab} index={0}>
        <ContinentsList favoritesOnly />
      </FavoritesPanel>
      <FavoritesPanel value={selectedTab} index={1}>
        <CountriesList favoritesOnly />
      </FavoritesPanel>
      <FavoritesPanel value={selectedTab} index={2}>
        <LanguagesList favoritesOnly />
      </FavoritesPanel>
    </div>
  );
};

export default Favorites;
