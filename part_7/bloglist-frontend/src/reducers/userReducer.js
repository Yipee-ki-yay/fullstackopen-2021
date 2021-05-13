import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotificationMessage } from './notificationReducer'

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
  case 'SET_USER':
    return action.data

  default:
    return state
  }
}

export const login = (data) => {
  return async dispatch => {
    try {
      const { username, password } = data
      const user = await loginService.login({
        username, password,
      })
      console.log('user', user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(setNotificationMessage(`User ${user.username} logged in`, 5))
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception.response.data.error}`, 5))
    }

    // const blogs = await blogService.getAll()
    // dispatch({
    //   type: 'INIT_BLOGS',
    //   data: blogs
    // })
  }
}


export default userReducer