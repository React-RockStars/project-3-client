import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ShowPosts from './components/ShowPosts/ShowPosts'
import CreatePost from './components/CreatePost/CreatePost'
import EditPost from './components/EditPost/EditPost'
import DeletePost from './components/DeletePost/DeletePost'
import CreateComment from './components/CreateComment/CreateComment'
import EditComment from './components/EditComment/EditComment'
import DeleteComment from './components/DeleteComment/DeleteComment'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      signUpModal: true,
      signInModal: true,
      changePasswordModal: true,
      createPostModal: true,
      editPostModal: true,
      createCommentModal: true,
      editCommentModal: true
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  onSignUpModalShow = () => {
    this.setState({ signUpModal: true })
  }

  onSignUpModalClose = () => {
    this.setState({ signUpModal: false })
  }
  onSignInModalShow = () => {
    this.setState({ signInModal: true })
  }

  onSignInModalClose = () => {
    this.setState({ signInModal: false })
  }

  onChangePasswordModalShow = () => {
    this.setState({ changePasswordModal: true })
  }

  onChangePasswordModalClose = () => {
    this.setState({ changePasswordModal: false })
  }

  onCreatePostModalShow = () => {
    this.setState({ createPostModal: true })
  }

  onCreatePostModalClose = () => {
    this.setState({ createPostModal: false })
  }
  onEditPostModalShow = () => {
    this.setState({ editPostModal: true })
  }

  onEditPostModalClose = () => {
    this.setState({ editPostModal: false })
  }

  onCreateCommentModalShow = () => {
    this.setState({ createCommentModal: true })
  }

  onCreateCommentModalClose = () => {
    this.setState({ createCommentModal: false })
  }

  onEditCommentModalShow = () => {
    this.setState({ editCommentModal: true })
  }

  onEditCommentModalClose = () => {
    this.setState({ editCommentModal: false })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} onSignUpModalShow={this.onSignUpModalShow} onSignUpModalClose={this.onSignUpModalClose} signUpModal={this.state.signUpModal}/>
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} onSignInModalShow={this.onSignInModalShow} onSignInModalClose={this.onSignInModalClose} signInModal={this.state.signInModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} onChangePasswordModalShow={this.onChangePasswordModalShow} onChangePasswordModalClose={this.onChangePasswordModalClose} changePasswordModal={this.state.changePasswordModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/posts' render={() => (
            <ShowPosts msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-post' render={() => (
            <CreatePost msgAlert={this.msgAlert} user={user} onCreatePostModalShow={this.onCreatePostModalShow} onCreatePostModalClose={this.onCreatePostModalClose} createPostModal={this.state.createPostModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/edit-post' render={() => (
            <EditPost msgAlert={this.msgAlert} user={user} onEditPostModalShow={this.onEditPostModalShow} onEditPostModalClose={this.onEditPostModalClose} editPostModal={this.state.editPostModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/posts/:id/delete-post' render={() => (
            <DeletePost msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/create-comment/:postId' render={() => (
            <CreateComment msgAlert={this.msgAlert} user={user} onCreateCommentModalShow={this.onCreateCommentModalShow} onCreateCommentModalClose={this.onCreateCommentModalClose} createCommentModal={this.state.createCommentModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/comments/:commentId/edit-comment/:postId' render={() => (
            <EditComment msgAlert={this.msgAlert} user={user} onEditCommentModalShow={this.onEditCommentModalShow} onEditCommentModalClose={this.onEditCommentModalClose} editCommentModal={this.state.editCommentModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/comments/:commentId/delete-comment/:postId' render={() => (
            <DeleteComment msgAlert={this.msgAlert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
