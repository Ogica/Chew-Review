import React from 'react'
import { Button,Modal} from 'semantic-ui-react'
import FormFieldControl from './FormFieldControl'
import Review from './Review'
class PlaceDetailsInfo extends React.Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  render_reviews=()=>{
    if (Object.keys(this.props.detail).length!==0){
      if (this.props.detail.hasOwnProperty('reviews')){
    return (this.props.detail.reviews.map(
      (review,index) =>{
       return (
        < Review review={review} key={index} />
     )
     }
   ))

      }
    } else{
      return(
        <div/>
      )
    }
  }



render (){
  return(
    <div>
    <Modal  trigger={
      <Button
      content='Reviews'
      onClick={this.handleOpen}
      fluid
      circular
      style={{width:'12em'}}
      inverted
      color='blue'
     />
   }
      open={this.state.modalOpen}
      onClose={this.handleClose}
 >
    <Modal.Content  key="reviews" style={{backgroundColor:'black', overflowX : 'auto',fontSize: '14px',color:'white'}}>
      <div>{this.render_reviews()}</div><hr />
      <h2 style={{textAlign:'center'}}>Review restaurant</h2><hr />
      <FormFieldControl
      inverted
      addDetails={this.props.addDetails}
      />
      <Modal.Actions>
        <Button
          circular
          color='red'
          onClick={this.handleClose}
          inverted
          floated='left'
          style={{display:'block',width:200, marginTop:3,marginRight:3.5,marginBottom:0,marginLeft:-4}}
          >Close</Button>
      </Modal.Actions>
        </Modal.Content>
    </Modal>
    </div>
  )
}
}
export default PlaceDetailsInfo
