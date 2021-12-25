import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import defineBlock from '../../utils/defineBlock';

const bem = defineBlock('PageTitle');

const PageTitle = ({ text }) => (
  <Typography className={bem()} variant="h4" gutterBottom sx={{ fontWeight: 'light' }}>
    {text}
  </Typography>
);

PageTitle.propTypes = {
  text: PropTypes.string.isRequired
};

export default PageTitle;
