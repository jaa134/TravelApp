import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import logoSrc from '../../assets/images/map.svg';
import defineBlock from '../../utils/defineBlock';
import { useFavorites } from '../utilities/favorites/FavoritesProvider';
import './AppToolbar.scss';

export const bem = defineBlock('AppToolbar');

const AppToolbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElUser(null);
  };
  const { clearFavorites } = useFavorites();
  const clearUserData = () => {
    clearFavorites();
    closeMenu();
  };
  return (
    <AppBar
      className={bem()}
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
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
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Open user menu">
          <IconButton onClick={openMenu}>
            <Avatar />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={closeMenu}
        >
          <MenuItem onClick={clearUserData}>
            <Typography textAlign="center">Reset user data</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
