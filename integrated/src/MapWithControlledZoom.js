import React from 'react';
import MarkersList from './MarkersList'

import { compose, withProps, withState, withHandlers } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps"

const MapWithControlledZoom = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%'  }} />,
    containerElement: <div style={{ height: '550px' }} />,
    mapElement: <div style={{ height: '730px', width:'1519px' }} />,
  }),
  withState('center','setCenter',{lat: -34.397, lng: 150.644}),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }
    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onDragEnd: ({ setCenter }) => () => {
        const x=refs.map.getCenter();
        setCenter({lat: x.lat(), lng: x.lng()})}
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultCenter={props.center}
    zoom={8}
    ref={props.onMapMounted}
    onDragEnd={props.onDragEnd}
    onCenterChanged={()=>{

    }
  }
  >
    <Marker
      position={{ lat: props.center.lat, lng: props.center.lng }}
      onClick={props.onToggleOpen}
    >
      <InfoWindow onCloseClick={props.onToggleOpen}>
        <div>
          {" "}
          Current center: {props.center.lat + "," + props.center.lng}
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
);

export default MapWithControlledZoom;
