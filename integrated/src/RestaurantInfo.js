import React from 'react'
import { Accordion, Icon,Rating} from 'semantic-ui-react'
import PlaceDetailsList from './PlaceDetailsList'
class RestaurantInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      details:{},
      activeIndex: -1,
      fetched: false
    }
  }

  fetch_details=() => {
    if(this.state.fetched===false && this.props.restaurant.place_id !=="-1" ) {
      fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+this.props.restaurant.place_id+"&fields=place_id,review,rating&key=AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs")
      .then(response => response.json())
      .then(data => {
       this.setState({details:data.result,fetched:true})
      })
    }
    }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex },()=>{this.fetch_details()})
  }

  check_opening_hours = (restaurant)=>{
    let text=""
    if(restaurant.hasOwnProperty("opening_hours")){
      if(restaurant.opening_hours.open_now === true){
        text="Open now"
      } else {
        text="Closed now"
      }
    }else {
      text="Timing unknown"
    }
    return(
      <span>{text}</span>
    )
  }

  check_price_level = (restaurant)=>{
    let text=""
    if(restaurant.hasOwnProperty("price_level")){
      if(restaurant.price_level === 1){
        text="$"
      } else if (restaurant.price_level === 2){
        text="$$"
      } else if (restaurant.price_level === 3){
        text="$$$"
      } else if (restaurant.price_level === 4){
        text="$$$$"
      } else if (restaurant.price_level === 5){
        text="$$$$$"
      }
    }else {
      text="Pricing unknown"
    }
    return(
      <span>{text}</span>
    )
  }

  addDetails=(detail)=>{
    let newReview={author_name: detail.name, rating:detail.rating, text:detail.text, author_url:"", relative_time_description:""}
    const details=this.state.details
    if(details.hasOwnProperty('reviews')===false){
      details.reviews=[]
    }
    details.reviews.push(newReview)
    this.setState({details:details})
  }


  render (){
    const { activeIndex } = this.state
    return (
      <span>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
              <h3>{this.props.restaurant.name}</h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>address: {this.props.restaurant.vicinity}</p>
            <div>rating:<Rating icon='star' maxRating={5} rating={this.props.restaurant.rating} disabled />  </div>
            <p>total ratings: {this.props.restaurant.user_ratings_total}</p>
            <p>pricing level: {this.check_price_level(this.props.restaurant)}</p>
            <p>open: {this.check_opening_hours(this.props.restaurant)}</p>
            <div><PlaceDetailsList details={this.state.details} restaurant={this.props.restaurant} addDetails={this.addDetails} /></div><hr />
          </Accordion.Content>
          </span>
    )
  }


}

export default RestaurantInfo
