import React from 'react';
import { Map, MouseControl } from 'react-mapycz'

const MapView = () => (
  <Map center={{lat: 55.604890000000005, lng: 8.97171}}>
    <MouseControl zoom={true} />
  </Map>
);

export default MapView;
