import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showPosts, deletePost } from '../../api/post'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class ShowPosts extends Component {
  constructor () {
    super()

    this.state = {
      posts: null,
      owner: false
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    showPosts(user)
      .then(res => {
        this.setState({ posts: res.data.posts })
      })
      .catch(error => {
        this.setState({ posts: null })
        msgAlert({
          heading: 'Show all posts failed with error: ' + error.message,
          message: messages.showPostsFailure,
          variant: 'danger'
        })
      })
  }

  deletePost = (postId) => {
    const { msgAlert, user } = this.props
    deletePost(user, postId)
      .then(() =>
        msgAlert({
          heading: 'Post was successfully deleted!',
          message: messages.deletePostSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/posts'))
      .catch(error => {
        this.setState({ posts: null })
        msgAlert({
          heading: 'Delete post failed with error: ' + error.message,
          message: messages.deletePostFailure,
          variant: 'danger'
        })
      })
  }

  editDeleteButton = (postOwner) => {
    const { user } = this.props
    if (user === postOwner) {
      this.setState({ owner: true })
    }
  }

  render () {
    let postsJsx = ''
    if (this.state.posts === null) {
      postsJsx = (
        <p>Loading...</p>
      )
    } else if (this.state.posts.length === 0) {
      postsJsx = (
        <p>There are no posts to display.</p>
      )
    } else {
      postsJsx = (
        <div>
          {this.state.posts.map(post => (
            <div key={post._id}>
              <Card className="text-left">
                <Card.Header>{post.owner._id}</Card.Header>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.body}
                  </Card.Text>
                  <Button href={`#/posts/${post._id}/edit-post`}>
                  Edit</Button>
                  <Button href={`#/posts/${post._id}/delete-post`}>
                  Delete</Button>
                  <Button href={`#/create-comment/${post._id}`}>
                  Add comment</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{post.timestamp}</Card.Footer>
              </Card>
              {post.comments.map(comment => (
                <div key={comment._id}>
                  <Card className="text-left">
                    <Card.Header>User</Card.Header>
                    <Card.Body>
                      <Card.Title>Comment</Card.Title>
                      <Card.Text>
                        {comment.content}
                      </Card.Text>
                      <Button href={`#/comments/${comment._id}/edit-comment`}>
                      Edit</Button>
                      <Button href={`#/comments/${post._id}/delete-comment`}>
                      Delete</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{comment.timestamp}</Card.Footer>
                  </Card>
                </div>
              ))
              }
            </div>
          ))}
        </div>
      )
    }
    return (
      <Fragment>
        <h1>Show All Posts</h1>
        {postsJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowPosts)
