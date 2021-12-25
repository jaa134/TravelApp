import React, { useState, useEffect } from 'react';
import { Viewer, GeoJsonDataSource } from 'resium';
import Typography from '@mui/material/Typography';
import defineBlock from '../../utils/defineBlock';
import './Home.scss';

const bem = defineBlock('Home');

const Home = () => {
  const [cesiumGeoJson, setCesiumGeoJson] = useState(false);
  useEffect(() => {
    import(/* webpackChunkName: 'cesiumGeoJson', webpackPrefetch: true */ '../../assets/config/cesium.geojson')
      .then((geoJson) => {
        setCesiumGeoJson(geoJson);
      });
  }, []);
  return (
    <div className={bem()}>
      <Typography variant="h2" component="div">
        Welcome to GeoPlanner
      </Typography>
      <Typography className={bem('subheader')} variant="h5" component="div">
        The world&apos;s #1 travel planning tool
      </Typography>
      <Viewer>
        <GeoJsonDataSource data={cesiumGeoJson} />
      </Viewer>
    </div>
  );
};

export default Home;
