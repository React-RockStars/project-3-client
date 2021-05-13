import apiUrl from '../apiConfig'
import axios from 'axios'

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

export const editComment = (commentData, user, id, postId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/comments/${id}`,
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
