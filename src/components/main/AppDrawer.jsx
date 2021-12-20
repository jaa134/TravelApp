import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TerminalIcon from '@mui/icons-material/Terminal';
import TranslateIcon from '@mui/icons-material/Translate';
import { paths } from '../../constants';
import defineBlock from '../../utils/defineBlock';
import AppNavList from './AppNavList';

export const bem = defineBlock('AppDrawer');

const mainNav = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: paths.HOME
  }
];

const viewsNav = [
  {
    name: 'Continents',
    icon: <PublicIcon />,
    href: paths.CONTINENTS
  },
  {
    name: 'Countries',
    icon: <FlagIcon />,
    href: paths.COUNTRIES
  },
  {
    name: 'Languages',
    icon: <TranslateIcon />,
    href: paths.LANGUAGES
  }
];

const utilitiesNav = [
  {
    name: 'Favorites',
    icon: <FavoriteIcon />,
    href: paths.FAVORITES
  },
  {
    name: 'Random',
    icon: <QuestionMarkIcon />,
    href: paths.RANDOM
  },
  {
    name: 'GraphiQL',
    icon: <TerminalIcon />,
    href: paths.GRAPHIQL
  }
];

const drawerWidth = 240;

const AppDrawer = () => (
  <Drawer
    className={bem()}
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <AppNavList type="main" entries={mainNav} />
      <Divider />
      <AppNavList type="views" subheader="Views" entries={viewsNav} />
      <Divider />
      <AppNavList type="utilities" subheader="Utilities" entries={utilitiesNav} />
    </Box>
  </Drawer>
);

export default AppDrawer;
