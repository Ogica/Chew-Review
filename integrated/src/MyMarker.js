import React from 'react'
import { Marker, InfoWindow } from "react-google-maps";
import { Icon,Rating} from 'semantic-ui-react'

class MyMarker extends React.Component {
  constructor (props){
    super(props)
    this.state= {
      isOpen: false
    }
    this.onToggleOpen=this.onToggleOpen.bind(this)
  }
  onToggleOpen(){
    this.setState({isOpen:!this.state.isOpen})
  }
  render () {
    return (
      <Marker position={{ lat: this.props.position.lat, lng: this.props.position.lng }} icon={{url:"http://maps.google.com/mapfiles/kml/pal2/icon33.png"}} onClick={this.onToggleOpen}>
      {this.state.isOpen &&  <InfoWindow onCloseClick={this.onToggleOpen}>
      <div>
      <h4>{this.props.message}</h4>
      <img alt="street view of the location" src={"https://maps.googleapis.com/maps/api/streetview?size=200x150&location="+this.props.position.lat+","+this.props.position.lng+"&heading=151.78&pitch=-0.76&key=AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs"} />
      <p>{this.props.address}</p>
      <div>rating:<Rating icon='star' maxRating={5} rating={this.props.rating} disabled />  </div>
      </div>
      </InfoWindow>}
      </Marker>
    )
  }
}
 export default MyMarker
