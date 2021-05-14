import React, { useState } from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveComment } from '../reducers/blogsReducer'
import {
  TextField,
  Button
} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const BlogInfo = ({ handleUpdateBlog }) => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleClickLikeBtn = () => {
    handleUpdateBlog(blog)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(saveComment({ id, text: comment }))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="blog-likes">{blog.likes} likes <Button variant="contained" color="primary" className="like-button" onClick={handleClickLikeBtn}>like</Button></div>
      {blog.user && <div>added by {blog.user.username}</div>}
      <br/>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField label="comment" value={comment} onChange={({ target }) => setComment(target.value)} type="text"/>
          <Button variant="contained" color="primary">add comment</Button>
        </form>
        {blog.comments && blog.comments.length > 0 && <List>
          {blog.comments.map((c, idx) => (
            <ListItem key={`${c}_${idx}`}><ListItemText>{c}</ListItemText></ListItem>
          ))}
        </List>}
      </div>
    </div>
  )
}

export default BlogInfo
