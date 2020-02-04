import React from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import Geocode from "react-geocode"

class NewRestaurantForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { name: '', address: '', lat:props.newPosition.lat, lng:props.newPosition.lng}
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    const { name, address,lat,lng} = this.state
    this.setState({ name: name, address: address, lat:lat, lng:lng}, ()=>{
      this.props.newRestaurant(this.state.name,this.state.address,this.state.lat,this.state.lng)
      this.clearState()
      this.props.closeForm()

    }
    )
  }


  clearState =()=>{
    this.setState({name:"", address:""})
  }

  componentWillMount(){
    Geocode.setApiKey("AIzaSyBxUN_fsfURkoyRkCsqlERPDGxzVAOLRDs");
    Geocode.setLanguage("en");
    Geocode.fromLatLng(this.props.newPosition.lat, this.props.newPosition.lng).then(
      response => {
      const address = response.results[0].formatted_address;
      this.setState({address:address})
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    const { name, address} = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit} width={12}>
          <Form.Group widths='equal'>
              <Form.Field control={Input} label='Name' placeholder='Enter restaurant name'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
              <Form.Field control={Input} label='Address' placeholder='Restaurant Address'
              name='address'
              value={address}
              onChange={this.handleChange}
            />
            <Input
            name='lat'
            type="hidden"
            value={this.state.lat}
            />
            <Input
            name='lng'
            type="hidden"
            value={this.state.lng}
            />
            </Form.Group>
            <Form.Group>
            <Button
            style={{display:'block',width:200, marginTop:0,marginRight:3.5,marginBottom:0,marginLeft:0}}
              color='green'
              content='Submit'
              inverted
              circular
              floated='left'
              />
            </Form.Group>
        </Form>
      </div>
    )
  }
}

export default NewRestaurantForm
