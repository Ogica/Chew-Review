import React from 'react'
import { Button, Form,Input,TextArea,Rating } from 'semantic-ui-react'



class FormFieldControl extends React.Component {
  state = { name: '', email: '', text: '',rating: 0, submittedName: '', submittedEmail: '', submittedText: '', submittedRating:''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  handleSubmit = () => {
    const { name, email, text, rating} = this.state
      this.setState({ submittedName: name, submittedEmail: email, submittedText: text,submittedRating: rating}, ()=>{
      this.props.addDetails(this.state)
      this.clearState()
    }
    )
    }

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating })

  clearState =()=>{
    this.setState({name:"", email:"", text:"", rating:0})
  }

  render() {
    const { name, email, text} = this.state

    return (
      <div>
        <Form inverted
        onSubmit={this.handleSubmit}
        width={12}
        >
          <Form.Group widths='equal'>
              <Form.Field control={Input} label='Name' placeholder='Name'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
              <Form.Field control={Input} label='Email' placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group inline>
              <label>Ratings</label>
              <Rating icon='star' defaultRating={this.state.rating} maxRating={5} onRate={this.handleRate} />
            </Form.Group>
          <Form.Field control={TextArea} label='Description' placeholder='Tell us more about this place...'
            name='text'
            value={text}
            onChange={this.handleChange}
            />
            <Form.Group
            >
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

export default FormFieldControl
