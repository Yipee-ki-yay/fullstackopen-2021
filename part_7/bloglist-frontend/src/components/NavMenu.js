import React from 'react'
import {
  Link
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const NavMenu = () => {
  const user = useSelector(state => state.user)
  const padding = {
    paddingRight: 5
  }
  const background = {
    background: 'lightgrey',
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
    <div style={background}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <span>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  )
}

export default NavMenu