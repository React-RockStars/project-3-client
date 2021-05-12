import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { createComment } from '../../api/post'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class CreateComment extends Component {
  constructor () {
    super()

    this.state = {
      comment: {
        content: ''
      }
    }
  }

  componentDidMount () {
    this.props.onCreateCommentModalShow()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { postId } = this.props.match.params
    createComment(this.state, user, postId)
      .then(res => {
        this.setState({ comment: res.data.comment })
      })
      .then(() =>
        msgAlert({
          heading: 'Create comment success',
          message: messages.createCommentSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/posts'))
      .catch(error => {
        this.setState({ title: '', body: '' })
        msgAlert({
          heading: 'Create comment failed with error: ' + error.message,
          message: messages.createCommentFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { content } = this.state
    return (
      <div>
        <Modal show={this.props.createCommentModal} onHide={this.props.onCreateCommentModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h3>Create Post</h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="content"
                      value={content}
                      placeholder="Enter comment"
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

export default withRouter(CreateComment)
