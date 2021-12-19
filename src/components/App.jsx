import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import logoSrc from '../assets/images/map.svg';
import defineBlock from '../utils/defineBlock';
import './App.scss';

export const bem = defineBlock('App');

const views = [
  {
    type: 'Grid',
    icon: <GridViewIcon />
  },
  {
    type: 'List',
    icon: <ListIcon />
  },
  {
    type: 'Map',
    icon: <MapIcon />
  },
  {
    type: 'Random',
    icon: <QuestionMarkIcon />
  }
]

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Box className={bem()} sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        open={menuOpen} 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            aria-label="open menu drawer"
            onClick={() => { setMenuOpen(true) }}
            edge="start"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <img
            className={bem('logo')}
            src={logoSrc}
            alt="logo"
            height="80"
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
          >
            GeoPlanner
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => { setMenuOpen(false) }}
      >
        <Toolbar /> 
        <List className={bem('nav-list')}>
          {views.map((view) => (
            <ListItem key={view.type} button>
              <ListItemIcon>
                {view.icon}
              </ListItemIcon>
              <ListItemText primary={view.type} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        abc
      </Box>
    </Box>
  );
};

export default App;
