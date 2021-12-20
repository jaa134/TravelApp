import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import defineBlock from '../../../utils/defineBlock';

const bem = defineBlock('FavoritesPanel');

const FavoritesPanel = ({
  value,
  index,
  children
}) => (
  value === index && (
    <Box className={bem()} sx={{ p: 3 }}>
      {children}
    </Box>
  )
);

FavoritesPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default FavoritesPanel;
