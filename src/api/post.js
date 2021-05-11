import apiUrl from '../apiConfig'
import axios from 'axios'

export const showPosts = () => {
  const { user } = this.props
  return axios({
    method: 'GET',
    url: apiUrl + '/posts',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

// export const signUp = credentials => {
//   return axios({
//     method: 'POST',
//     url: apiUrl + '/sign-up',
//     data: {
//       credentials: {
//         email: credentials.email,
//         password: credentials.password,
//         password_confirmation: credentials.passwordConfirmation
//       }
//     }
//   })
// }
