import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import NavMenu from './components/NavMenu'
import './index.css'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [ notificationFlag, setNotificationFlag] = useState('success')
  const noteFormRef = useRef()
  const filteredBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleAddBlog = (blogFields) => {
    noteFormRef.current.toggleVisibility()

    dispatch(createBlog(blogFields))
  }

  const handleUpdateBlog = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleDeleteBlog = async (blog) => {
    dispatch(deleteBlog(blog))
  }

  // const handleLogout = () => {
  //   window.localStorage.removeItem('loggedBlogappUser')
  //   dispatch({
  //     type: 'SET_USER',
  //     data: null
  //   })
  // }

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
    <Router>
      <Notification flag={notificationFlag} />
      {/* <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div> */}
      <NavMenu />
      <br/>
      <Switch>
        <Route path="/blogs/:id">
          <BlogInfo
            handleUpdateBlog={handleUpdateBlog}
          />
        </Route>
        <Route path="/users/:id">
          <UserInfo/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
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
        </Route>
      </Switch>
    </Router>
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