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

  case 'UPDATE_BLOG':
    // eslint-disable-next-line no-case-declarations
    const changedBlogIndex = state.findIndex(b => b.id === action.data.id)

    return [
      ...state.slice(0, changedBlogIndex),
      action.data,
      ...state.slice(changedBlogIndex + 1),
    ]

  case 'DELETE_BLOG':
    // eslint-disable-next-line no-case-declarations
    const deletedBlogIndex = state.findIndex(b => b.id === action.data.id)

    return [
      ...state.slice(0, deletedBlogIndex),
      ...state.slice(deletedBlogIndex + 1),
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
      dispatch(setNotificationMessage(`Blog ${createdBlog.title} added`, 5))
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5))
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const payload = {
        data: {
          likes: blog.likes + 1
        },
        id: blog.id
      }
      const updatedBlog = await blogService.updateBlog(payload)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(setNotificationMessage(`Blog ${updatedBlog.title} updated`))
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const payload = {
        id: blog.id
      }
      await blogService.deleteBlog(payload)
      dispatch({
        type: 'DELETE_BLOG',
        data: payload
      })
      dispatch(setNotificationMessage(`Blog ${blog.title} deleted`, 5))
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5))
    }
  }
}

export const saveComment = (payload) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.saveComment(payload)

      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(setNotificationMessage('To blog added comment', 5))
    } catch (exception) {
      dispatch(setNotificationMessage(`${exception}`, 5))
    }
  }
}

export default blogsReducer