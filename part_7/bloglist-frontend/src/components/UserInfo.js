import React from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

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
      <List>
        {user.blogs.map(b => (
          <ListItem key={b.id}><ListItemText>{b.title}</ListItemText></ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserInfo
