import React from 'react';
import './App.css';
import {Menu,Sidebar,Segment,Grid,Rating,Button,Responsive} from 'semantic-ui-react';
import RestaurantList from './RestaurantList'
import MyMaps from './MyMaps'
import Data from './Data.json'
import  './App.css';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      restaurantData:[],
      center:{ lat:  0, lng: 0},
      minRating:0,
      maxRating:5,
      visible:true,
    }
  }

  fetch_data=() => {
    fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ this.state.center.lat +","+this.state.center.lng + "&radius=1500&type=restaurant&key=Enter your google API key")
    .then(response => response.json())
    .then(data => {
      this.setState({restaurantData:this.state.restaurantData.concat(data.results)})
    })

  }

  setCenter=(lat,lng)=>{
    this.setState({
      restaurantData:[],
     center: {lat: lat, lng:  lng}} ,
      () => this.fetch_data()
    )
  }


  getGeoLocation =() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        center: {
                            ...prevState.center,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                    }
                  }),
                  () => this.fetch_data()
                )},
                error=>{
                  this.setState({
                   center: {lat:  51.509865, lng:  -0.118092}} ,
                    () => this.fetch_data());

                }
            );
        } else {
         this.setState({
          center: {lat:  51.509865, lng:  -0.118092}} ,
           () => this.fetch_data());
         }
    }

      loadJsonRestaurants=(data)=>{
      this.setState({restaurantData:this.state.restaurantData.concat(Data.results)})
    }


  handleMinRating = (e) => this.setState({ minRating: e.target.value })

  handleMaxRating = (e) =>
    this.setState({ maxRating: e.target.value })

    addRestaurant=(name,address,lat,lng)=>{
      let newRestaurant={
        'geometry':{
          'location':{
            'lat': lat,
            'lng':lng
          }
        },
        'name':name,
        'vicinity':address,
        'rating':0,
        'icon':'http://maps.google.com/mapfiles/kml/pal2/icon63.png',
        'user_ratings_total':0,
        'place_id':'-1'
         }
      this.setState({restaurantData:this.state.restaurantData.concat([newRestaurant])})
    }

    UNSAFE_componentWillMount() {
      this.loadJsonRestaurants(Data)
      this.getGeoLocation()
      }


  render (){
    return (
    <div>
    <Grid stackable>
      <Grid.Row as={Menu}
        fixed='top'
        inverted
        borderless>
          <Menu.Item >
            <h1 className="tittle">Chew Review</h1>
            </Menu.Item>
            <Menu.Item >
            <Responsive  maxWidth={1024}>
            <Button className='heading'
            fluid
            circular
            inverted
            color='blue'
            onClick={(e)=>{this.setState({visible:!this.state.visible})}} >See restaurants</Button>
            </Responsive>
            </Menu.Item>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: '6.2em',paddingBottom:0 }}>
        <Sidebar.Pushable as={Segment} >
          <Sidebar
            style={{marginRight:0}}
            animation='overlay'
            direction="right"
            icon='labeled'
            visible={this.state.visible}
            >
            <Segment inverted  >
            <h3>Search by ratings</h3>
            <input
              type='range'
              min={0}
              max={5}
              value={this.state.minRating}
              onChange={this.handleMinRating}
            />
            <Rating icon='star' rating={this.state.minRating} maxRating={5} disabled/>
            <input
              type='range'
              min={0}
              max={5}
              value={this.state.maxRating}
              onChange={this.handleMaxRating}
            />
            <Rating icon='star'rating={this.state.maxRating} maxRating={5} disabled />
            <RestaurantList restaurants={ this.state.restaurantData.filter((restaurant)=>{
              return (
                Math.floor(restaurant.rating)<=this.state.maxRating && Math.floor(restaurant.rating)  >= this.state.minRating
              )
              })

} />
            </Segment>
          </Sidebar>
        <Sidebar.Pusher >
        <Segment basic style={{paddingBottom:0}}>
        <MyMaps restaurants={  this.state.restaurantData.filter((restaurant)=>{
          return (
            Math.floor(restaurant.rating) <= this.state.maxRating && Math.floor(restaurant.rating)  >= this.state.minRating
          )
          })

} center={this.state.center} setCenter={this.setCenter} newRestaurant={this.addRestaurant} />
         </Segment>
           </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Row>
      </Grid>
    </div>
  );
}
}

export default App;
