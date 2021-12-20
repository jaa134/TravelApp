import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TerminalIcon from '@mui/icons-material/Terminal';
import TranslateIcon from '@mui/icons-material/Translate';
import logoSrc from '../../assets/images/map.svg';
import { paths } from '../../constants';
import defineBlock from '../../utils/defineBlock';
import AppNavList from './AppNavList';
import AppNavRoutes from './AppNavRoutes';
import './App.scss';

export const bem = defineBlock('App');

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
          <Box sx={{ flexGrow: 1 }} />
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
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={() => { setAnchorElUser(null); }}
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
        <AppNavList type="main" entries={mainNav} />
        <Divider />
        <AppNavList type="views" subheader="Views" entries={viewsNav} />
        <Divider />
        <AppNavList type="utilities" subheader="Utilities" entries={utilitiesNav} />
      </Drawer>
      <Box
        className={bem('content')}
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <AppNavRoutes />
      </Box>
    </Box>
  );
};

export default App;
