import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { editComment } from '../../api/comment'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class EditComment extends Component {
  constructor () {
    super()

    this.state = {
      comment: {
        content: ''
      }
    }
  }

  componentDidMount () {
    this.props.onEditCommentModalShow()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { postId, commentId } = this.props.match.params
    editComment(this.state, user, commentId, postId)
      .then(res => {
        this.setState({ comment: res.data.comment })
      })
      .then(() =>
        msgAlert({
          heading: 'Edit comment success',
          message: messages.editCommentSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/posts'))
      .catch(error => {
        this.setState({ content: '' })
        msgAlert({
          heading: 'Edit comment failed with error: ' + error.message,
          message: messages.editCommentFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { content } = this.state
    return (
      <div>
        <Modal show={this.props.editCommentModal} onHide={this.props.onEditCommentModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h3>Edit Comment</h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="content"
                      value={content}
                      placeholder="Edit comment"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default withRouter(EditComment)
