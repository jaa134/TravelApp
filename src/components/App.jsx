import React, { useState } from 'react';
import {
  Link,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import logoSrc from '../assets/images/map.svg';
import { paths } from '../constants';
import defineBlock from '../utils/defineBlock';
import CountriesList from './views/list/CountriesList';
import './App.scss';

export const bem = defineBlock('App');

const views = [
  {
    type: 'Grid',
    icon: <GridViewIcon />,
    href: paths.GRID
  },
  {
    type: 'List',
    icon: <ListIcon />,
    href: paths.LIST
  },
  {
    type: 'Map',
    icon: <MapIcon />,
    href: paths.MAP
  }
];

const utilities = [
  {
    type: 'Favorites',
    icon: <FavoriteIcon />,
    href: paths.RANDOM
  },
  {
    type: 'Random',
    icon: <QuestionMarkIcon />,
    href: paths.RANDOM
  }
];

const userMenuItems = ['Profile', 'Account', 'Dashboard', 'Logout'];

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
            onClick={() => { setMenuOpen(!menuOpen); }}
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
          <Box sx={{ flexGrow: 1 }}  />
          <Tooltip title="Open user menu">
            <IconButton onClick={(event) => { setAnchorElUser(event.currentTarget); }}>
              <Avatar />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={()=> { setAnchorElUser(null); }}
          >
            {userMenuItems.map((setting) => (
              <MenuItem key={setting}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => { setMenuOpen(false); }}
      >
        <Toolbar />
        <List
          className={bem('nav-list')}
          component="nav"
          aria-labelledby={bem('views')}
          subheader={(
            <ListSubheader component="div" id={bem('views')}>
              View types
            </ListSubheader>
          )}
        >
          {views.map((view) => (
            <ListItem key={view.type} button component={Link} to={view.href}>
              <ListItemIcon>
                {view.icon}
              </ListItemIcon>
              <ListItemText primary={view.type} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          className={bem('nav-list')}
          component="nav"
          aria-labelledby={bem('views')}
          subheader={(
            <ListSubheader component="div" id={bem('views')}>
              Utilities
            </ListSubheader>
          )}
        >
          {utilities.map((view) => (
            <ListItem key={view.type} button component={Link} to={view.href}>
              <ListItemIcon>
                {view.icon}
              </ListItemIcon>
              <ListItemText primary={view.type} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        className={bem('content')}
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Routes>
          <Route path={paths.GRID} element={<div />} exact />
          <Route path={paths.LIST} element={<CountriesList />} exact />
          <Route path={paths.MAP} element={<div />} exact />
          <Route path={paths.RANDOM} element={<div />} exact />
          <Route path="*" element={<Navigate replace to={paths.GRID} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
