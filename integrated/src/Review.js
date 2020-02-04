import React from 'react'
import {Rating} from 'semantic-ui-react'

class Review extends React.Component {

  render (){
    return (
    <div ><br />
      <a href={this.props.review.author_url} target="_blank" rel="noopener noreferrer">{this.props.review.author_name}</a>
      <p><br />{(this.props.review.relative_time_description)}<br /></p>
      <div>rating:<Rating icon='star' maxRating={5} rating={this.props.review.rating} disabled /><br /></div>
      <p><br />{(this.props.review.text)}<br /></p>
      <br />
     </div>
   )
  }
}

export default Review
