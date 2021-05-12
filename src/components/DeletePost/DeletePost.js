import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { deletePost } from '../../api/post'

class DeletePost extends Component {
  constructor () {
    super()

    this.state = {
      delete: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { id } = this.props.match.params
    deletePost(user, id)
      .then(() => {
        this.setState({ delete: true })
        msgAlert({
          heading: 'Post was successfully deleted!',
          message: messages.deletePostSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete post failed with error: ' + error.message,
          message: messages.deletePostFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.delete ? <Redirect to="/posts" /> : ''}
      </div>
    )
  }
}

export default withRouter(DeletePost)
