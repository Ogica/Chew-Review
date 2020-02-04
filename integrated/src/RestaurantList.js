import React from 'react';
import RestaurantInfo from './RestaurantInfo'
import { Accordion, Segment} from 'semantic-ui-react'

class RestaurantList extends React.Component {

  render_restaurants=()=>{
    return(
    this.props.restaurants.map(
      (restaurant,index) =>
      <RestaurantInfo key={restaurant.place_id}
        restaurant={restaurant}
        index={index}
       />)
    )
  }

  render () {

    return (
      <Segment inverted>
      <Accordion inverted>
      {this.render_restaurants()}
      </Accordion>
      </Segment>
    )
  }
}
export default RestaurantList;
