import React from 'react'
import MapWithAMarker from './MapWithAMarker'
class MyMaps extends React.Component {
  constructor(props){
    super(props)
      this.state={
        showForm:false,
        newPosition:{lat:0,lng:0}
      }

  }

  openForm=(position)=>{
    this.setState({showForm:true,newPosition:position})
  }

  closeForm=()=>{
    this.setState({showForm:false})
  }

  render() {

    return (
<MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: '100%'  }} />}
  containerElement={<div style={{ height: '95vh' }} />}
  mapElement={<div className='mapResizer' />}
  restaurants={this.props.restaurants}
  center={this.props.center}
  setCenter={this.props.setCenter}
  showForm={this.state.showForm}
  openForm={this.openForm}
  closeForm={this.closeForm}
  newPosition={this.state.newPosition}
  newRestaurant={this.props.newRestaurant}
/>
)
}
}
export default MyMaps
