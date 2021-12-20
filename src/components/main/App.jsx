import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import defineBlock from '../../utils/defineBlock';
import AppToolbar from './AppToolbar';
import AppDrawer from './AppDrawer';
import AppNavRoutes from './AppNavRoutes';
import './App.scss';

export const bem = defineBlock('App');

const App = () => (
  <Box className={bem()} sx={{ display: 'flex' }}>
    <AppToolbar />
    <AppDrawer />
    <Box component="div" sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Box
        className={bem('content')}
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <AppNavRoutes />
      </Box>
    </Box>
  </Box>
);

export default App;
