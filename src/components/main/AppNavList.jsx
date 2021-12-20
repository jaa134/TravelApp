import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import defineBlock from '../../utils/defineBlock';
import './AppNavList.scss';

const bem = defineBlock('AppNavList');

const AppNavList = ({
  type,
  subheader,
  entries
}) => {
  let headerAttrs = null;
  if (subheader) {
    headerAttrs = {
      'aria-labelledby': bem(type),
      subheader: (
        <ListSubheader id={bem(type)} component="div">
          {subheader}
        </ListSubheader>
      )
    };
  }
  return (
    <List
      className={bem()}
      component="nav"
      {...headerAttrs}
    >
      {entries.map((entry) => (
        <ListItem key={entry.name} button component={Link} to={entry.href}>
          <ListItemIcon>
            {entry.icon}
          </ListItemIcon>
          <ListItemText primary={entry.name} />
        </ListItem>
      ))}
    </List>
  );
};

AppNavList.propTypes = {
  type: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  entries: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
  })).isRequired
};

AppNavList.defaultProps = {
  subheader: null
};

export default AppNavList;
