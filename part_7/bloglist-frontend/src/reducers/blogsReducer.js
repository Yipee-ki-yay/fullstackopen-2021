import blogService from '../services/blogs'
import { setNotificationMessage } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [
      ...state,
      action.data
    ]

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.saveBlog(content)
      dispatch({
        type: 'NEW_BLOG',
        data: createdBlog
      })
      dispatch(setNotificationMessage(`Blog ${createdBlog.title} added`), 5)
    } catch (exception) {
      // setNotificationFlag('error')
      dispatch(setNotificationMessage(`${exception}`), 5)
      // setTimeout(() => {
      //   setNotificationFlag('success')
      // }, 5000)
    }
  }
}

export default blogsReducer