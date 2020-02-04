import React from 'react'
import MyMarker from './MyMarker'

class MarkersList extends React.Component {


  render_markers=()=>{
  return(
  this.props.restaurants.map(
    restaurant =>
    <MyMarker key={restaurant.place_id} position={{lat:restaurant.geometry.location.lat, lng:restaurant.geometry.location.lng }}
    message={restaurant.name} address={restaurant.vicinity} rating={restaurant.rating} />)
  )
}
  render (){

    return(
      <div>
      {this.render_markers()}
      </div>
    )
  }
}

 export default MarkersList
