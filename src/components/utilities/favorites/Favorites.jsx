import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import defineBlock from '../../../utils/defineBlock';
import FavoritesPanel from './FavoritesPanel';

const bem = defineBlock('Favorites');

const Favorites = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div className={bem()}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
      >
        Your favorites
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Continents" />
          <Tab label="Countries" />
          <Tab label="Languages" />
        </Tabs>
      </Box>
      <FavoritesPanel value={selectedTab} index={0}>
        Continents
      </FavoritesPanel>
      <FavoritesPanel value={selectedTab} index={1}>
        Countries
      </FavoritesPanel>
      <FavoritesPanel value={selectedTab} index={2}>
        Languages
      </FavoritesPanel>
    </div>
  );
};

export default Favorites;
