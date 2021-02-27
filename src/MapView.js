import React from 'react';

import {
  Map, MouseControl, CompassControl, MarkerLayer,
  Marker, KeyboardControl, ZoomControl
} from 'react-mapycz'

const MapView = ({marker}) => (
  <Map height="600px" zoom={10} center={marker || {lat: 50.0755, lng: 14.4378}}>
    <KeyboardControl/>
    <ZoomControl/>
    <MouseControl zoom={true} pan={true} wheel={true}/>
    <CompassControl right={10} top={50}/>
    <MarkerLayer>
      {marker && <Marker coords={marker}/>}
    </MarkerLayer>
  </Map>
);

export default MapView;
