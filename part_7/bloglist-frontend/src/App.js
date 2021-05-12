import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationMessage } from './reducers/notificationReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationFlag, setNotificationFlag] = useState('success')
  const noteFormRef = useRef()
  const filteredBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const dispatch = useDispatch()
  console.log('filteredBlogs', filteredBlogs)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user', user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotificationMessage(`User ${user.username} logged in`), 5)
    } catch (exception) {
      setNotificationFlag('error')
      dispatch(setNotificationMessage(`${exception.response.data.error}`), 5)
      setTimeout(() => {
        setNotificationFlag('success')
      }, 5000)
    }
  }

  const handleAddBlog = async (blogFields) => {
    noteFormRef.current.toggleVisibility()

    try {
      const createdBlog = await blogService.saveBlog(blogFields)
      setBlogs([...blogs, createdBlog])
      dispatch(setNotificationMessage(`Blog ${createdBlog.title} added`), 5)
    } catch (exception) {
      setNotificationFlag('error')
      dispatch(setNotificationMessage(`${exception}`), 5)
      setTimeout(() => {
        setNotificationFlag('success')
      }, 5000)
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      const payload = {
        data: {
          likes: blog.likes + 1
        },
        id: blog.id
      }
      const updatedBlog = await blogService.updateBlog(payload)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b))
      dispatch(setNotificationMessage(`Blog ${updatedBlog.title} updated`), 5)
    } catch (exception) {
      setNotificationFlag('error')
      dispatch(setNotificationMessage(`${exception}`), 5)
      setTimeout(() => {
        setNotificationFlag('success')
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      const payload = {
        id: blog.id
      }
      await blogService.deleteBlog(payload)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      dispatch(setNotificationMessage(`Blog ${blog.title} deleted`), 5)
    } catch (exception) {
      setNotificationFlag('error')
      dispatch(setNotificationMessage(`${exception}`), 5)
      setTimeout(() => {
        setNotificationFlag('success')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification flag={notificationFlag} />
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          <span>password</span>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="text"
            name="password"
            id="password"
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const blogsBlock = () => (
    <div>
      <h2>blogs</h2>
      <Notification flag={notificationFlag} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <BlogForm
          handleAddBlog={handleAddBlog}
        />
      </Togglable>
      <div>
        {filteredBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdateBlog={handleUpdateBlog}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogsBlock()
      }
    </div>
  )
}

export default App