import React from 'react'
import PlaceDetailsInfo from './PlaceDetailsInfo'

class PlaceDetailsList extends React.Component {



render () {
  return (
    <PlaceDetailsInfo
      detail={this.props.details}
      restaurant={this.props.restaurant}
      addDetails={this.props.addDetails}
     />

  )
}

}
export default PlaceDetailsList
