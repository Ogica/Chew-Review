import React from 'react';
import './App.css';
import {Menu,Container,Image,Sidebar,Segment,Grid,Dropdown,Icon} from 'semantic-ui-react';
import Logo from './logos.png'
import Map from './map.png'
import RestaurantList from './RestaurantList'
class App extends React.Component {
  render (){
  return (
    <div>
    <Grid >
      <Grid.Row as={Menu}
        fixed='top'
        inverted
        borderless>
          <Menu.Item >
            <Image size='mini' src={Logo} style={{ marginRight: '1.5em' }} />
            Chew Review
            </Menu.Item>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: '6.2em' }}>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation='overlay'
            direction="right"
            icon='labeled'
            visible={true}
            width={'wide'}>
              <RestaurantList />
          </Sidebar>
        <Sidebar.Pusher>
        <Segment basic>
          <Image src={Map} />
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
