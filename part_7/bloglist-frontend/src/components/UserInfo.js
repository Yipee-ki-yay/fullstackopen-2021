import React from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id))

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
