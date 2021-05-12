import apiUrl from '../apiConfig'
import axios from 'axios'

export const showPosts = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createPost = (postData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        title: postData.title,
        body: postData.body
      }
    }
  })
}

export const editPost = (postData, user, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/posts/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      post: {
        title: postData.title,
        body: postData.body
      }
    }
  })
}

export const deletePost = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/posts/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createComment = (commentData, user, postId) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/comments',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: {
        content: commentData.content,
        postId: postId
      }
    }
  })
}
