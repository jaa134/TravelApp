import React, { useState, useEffect } from 'react';
import { Viewer, GeoJsonDataSource } from 'resium';
import defineBlock from '../../../utils/defineBlock';
import PageTitle from '../../common/PageTitle';

const bem = defineBlock('TourPage');

const TourPage = () => {
  const [cesiumGeoJson, setCesiumGeoJson] = useState(false);
  useEffect(() => {
    import(/* webpackChunkName: 'cesiumGeoJson', webpackPrefetch: true */ '../../../assets/config/cesium.geojson')
      .then((geoJson) => {
        setCesiumGeoJson(geoJson);
      });
  }, []);
  return (
    <div className={bem()}>
      <PageTitle text="Virtual tour" />
      <Viewer>
        <GeoJsonDataSource data={cesiumGeoJson} />
      </Viewer>
    </div>
  );
};

export default TourPage;
