import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { deleteComment } from '../../api/comment'

class DeleteComment extends Component {
  constructor () {
    super()

    this.state = {
      delete: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { commentId, postId } = this.props.match.params
    deleteComment(user, commentId, postId)
      .then(() => {
        this.setState({ delete: true })
        msgAlert({
          heading: 'Comment was successfully deleted!',
          message: messages.deleteCommentSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete comment failed with error: ' + error.message,
          message: messages.deleteCommentFailure,
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

export default withRouter(DeleteComment)
