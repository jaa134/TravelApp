import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import defineBlock from '../../../utils/defineBlock';

const bem = defineBlock('FavoritesPanel');

const FavoritesPanel = ({
  value,
  index,
  children
}) => (
  value === index && (
    <Box className={bem()}>
      <Typography>{children}</Typography>
    </Box>
  )
);

FavoritesPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default FavoritesPanel;
