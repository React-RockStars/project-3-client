import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { editPost } from '../../api/post'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class EditPost extends Component {
  constructor () {
    super()

    this.state = {
      post: {
        title: '',
        body: ''
      }
    }
  }

  componentDidMount () {
    this.props.onEditPostModalShow()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { id } = this.props.match.params

    editPost(this.state, user, id)
      .then(res => {
        this.setState({ post: res.data.post })
      })
      .then(() =>
        msgAlert({
          heading: 'Edit post success',
          message: messages.editPostSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/posts'))
      .catch(error => {
        this.setState({ title: '', body: '' })
        msgAlert({
          heading: 'Edit post failed with error: ' + error.message,
          message: messages.editPostFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { title, body } = this.state
    return (
      <div>
        <Modal show={this.props.editPostModal} onHide={this.props.onEditPostModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h3>Edit Post</h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Enter title"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                      required
                      name="body"
                      value={body}
                      type="textarea"
                      placeholder="body"
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

export default withRouter(EditPost)
