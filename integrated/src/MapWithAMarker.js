import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import MarkersList from './MarkersList'
import {Modal} from 'semantic-ui-react'
import NewRestaurantForm from './NewRestaurantForm'


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <div>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat:props.center.lat, lng: props.center.lng }}
    center= {{ lat:props.center.lat, lng: props.center.lng }}
    gestureHandling= {'greedy'}
    onClick={e=>{
      const position={lat:e.latLng.lat(), lng:e.latLng.lng()}
      props.openForm(position)


    }}
    >
    <Marker draggable
    onDragEnd= {e=>{
       props.setCenter(e.latLng.lat(), e.latLng.lng())
    }}
    position={{ lat: props.center.lat, lng: props.center.lng }}
    />
    <MarkersList restaurants={props.restaurants}/>
  </GoogleMap>
  <Modal open={props.showForm} onClose={props.closeForm} closeIcon >
  <Modal.Header>Add a new restaurant</Modal.Header>
  <Modal.Content >
  <NewRestaurantForm
    newPosition={props.newPosition}
    newRestaurant={props.newRestaurant}
    closeForm={props.closeForm}
      />
  </Modal.Content>
</Modal>

  </div>
));
 export default MapWithAMarker
