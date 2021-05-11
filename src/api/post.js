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