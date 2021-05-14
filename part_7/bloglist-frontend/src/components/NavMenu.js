import React from 'react'
import {
  Link
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'

const NavMenu = () => {
  const user = useSelector(state => state.user)
  const padding = {
    paddingRight: 5
  }
  const background = {
    background: 'darkgrey',
    padding: '10px'
  }
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }

  return (
    <AppBar position="static" style={background}>
      <Toolbar>
        <span><Link to='/' style={padding}>blogs</Link></span>
        <span><Link to='/users' style={padding}>users</Link></span>
        <span>
          {user.name} logged in
          <Button variant="contained" color="primary" onClick={handleLogout}>logout</Button>
        </span>
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu