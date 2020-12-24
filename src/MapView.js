import React from 'react';
import { Map, MouseControl, CompassControl, MarkerLayer, Marker, KeyboardControl, ZoomControl } from 'react-mapycz'

// const MapView = () => (
//   <Map center={{lat: 55.604890000000005, lng: 8.97171}}>
//     <MouseControl zoom={true} />
//   </Map>
// );

const MapView = () => (
  <Map height="600px" center={{lat: 50.0755, lng: 14.4378}}>
    <KeyboardControl/>
    <ZoomControl/>
    <MouseControl zoom={true} pan={true} wheel={true}/>
    <CompassControl right={10} top={50}/>
    <MarkerLayer>
      <Marker coords={{lat: 50.0755, lng: 14.4378}}/>
    </MarkerLayer>
  </Map>
);

export default MapView;
