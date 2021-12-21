import React from 'react';
import { Viewer } from 'resium';
import Typography from '@mui/material/Typography';
import defineBlock from '../../utils/defineBlock';
import './Home.scss';

const bem = defineBlock('Home');

const Home = () => (
  <div className={bem()}>
    <Typography variant="h2" component="div">
      Welcome to GeoPlanner
    </Typography>
    <Typography className={bem('subheader')} variant="h5" component="div">
      The world&apos;s #1 travel planning tool
    </Typography>
    <Viewer />
  </div>
);

export default Home;
