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
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  Button
} from '@material-ui/core'
import './index.css'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
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

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
            name="username"
            label="username"
            id="username"
          />
        </div>
        <div>
          <TextField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="text"
            name="password"
            label="password"
            id="password"
          />
        </div>
        <Button variant="contained" color="primary" id="login-button" type="submit">login</Button>
      </form>
    </div>
  )

  const blogsBlock = () => (
    <Router>
      <Notification />
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
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {filteredBlogs.map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleUpdateBlog={handleUpdateBlog}
                    handleDeleteBlog={handleDeleteBlog}
                    user={user}
                  />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </Router>
  )

  return (
    <Container>
      {user === null ?
        loginForm() :
        blogsBlock()
      }
    </Container>
  )
}

export default App