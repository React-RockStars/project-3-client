import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showPosts, deletePost } from '../../api/post'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'

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
        console.log(this.state.posts)
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
              <div className="mx-auto mt-5">
                <Card className="text-left">
                  <Card.Header>Post</Card.Header>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                      {post.body}
                    </Card.Text>
                    {this.props.user._id === post.owner ? <Button href={`#/posts/${post._id}/edit-post`}>
                    Edit</Button> : ''}
                    {this.props.user._id === post.owner ? <Button href={`#/posts/${post._id}/delete-post`}>
                    Delete</Button> : ''}
                    <Button href={`#/create-comment/${post._id}`}>
                    Add comment</Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">{post.updatedAt}</Card.Footer>
                </Card>
                {post.comments.length > 0
                  ? <Accordion>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          View comments
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>{post.comments.map(comment => (
                          <div key={comment._id}>
                            <p>{comment.content}</p>
                            <Button href={`#/comments/${comment._id}/edit-comment/${post._id}`}>
                          Edit</Button>
                            <Button href={`#/comments/${comment._id}/delete-comment/${post._id}`}>
                          Delete</Button>
                          </div>
                        ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion> : ''}
              </div>
            </div>
          ))
          }
        </div>
      )
    }
    return (
      <Fragment>
        <h1>What&apos;cha Watchin&apos;</h1>
        {postsJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowPosts)
