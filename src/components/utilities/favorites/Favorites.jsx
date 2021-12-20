import React from 'react';
import Typography from '@mui/material/Typography';
import defineBlock from '../../../utils/defineBlock';

const bem = defineBlock('Favorites');

const Favorites = () => (
  <div className={bem()}>
    <Typography
      variant="h5"
      component="div"
      gutterBottom
    >
      Your favorites
    </Typography>
    <Typography
      variant="subtitle1"
      component="div"
    >
      These are the places that you&apos;ve liked
    </Typography>
  </div>
);

export default Favorites;
