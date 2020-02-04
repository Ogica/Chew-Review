import React from 'react';
import MapWithAMarker from './MapWithAMarker'
import MarkerWithInfoWindow from './MarkerWithInfoWindow'
//import markers from './Markers'
//import restaurantData from './restaurantData.json'
//const getMarkers = restaurantData.results.map(restaurant =><MarkerWithInfoWindow key={restaurant.place_id} position={{lat:restaurant.geometry.location.latitude, lng:restaurant.geometry.location.latitude }} message={restaurant.name} />)
const centerMarker =   <MarkerWithInfoWindow position={{ lat: 51.170558, lng: 14.974753 }} message={"center"} />

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      restaurantData:[]
    }
  }

  render_markers=()=>{
    return(
    this.state.restaurantData.map(
      restaurant =>
      <MarkerWithInfoWindow key={restaurant.place_id} position={{lat:restaurant.geometry.location.lat, lng:restaurant.geometry.location.lng }}
      message={restaurant.name} />)
    )
  }

  fetch_data=() => {
    fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.170558,14.974753&radius=1500&type=restaurant&key=AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({restaurantData: this.state.restaurantData.concat(data.results)})
    })

  }

  componentWillMount() {
    this.fetch_data()
  }

  render () {

    return (
      <div >
      <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      markers={this.render_markers()}
      centerMarker = {centerMarker}
      />
      </div>
    );
  }
}
export default Map;
