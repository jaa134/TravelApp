import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const PageTitle = ({ text }) => (
  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'light' }}>
    {text}
  </Typography>
);

PageTitle.propTypes = {
  text: PropTypes.string.isRequired
};

export default PageTitle;
