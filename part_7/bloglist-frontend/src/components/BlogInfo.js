import React, { useState } from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveComment } from '../reducers/blogsReducer'

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
      <div className="blog-likes">{blog.likes} likes <button className="like-button" onClick={handleClickLikeBtn}>like</button></div>
      {blog.user && <div>added by {blog.user.username}</div>}
      <br/>
      <div>
        <b>comments</b>
        <form onSubmit={handleSubmit}>
          <input value={comment} onChange={({ target }) => setComment(target.value)} type="text"/>
          <button>add comment</button>
        </form>
        {blog.comments && blog.comments.length && <ul>
          {blog.comments.map((c, idx) => (
            <li key={`${c}_${idx}`}>{c}</li>
          ))}
        </ul>}
      </div>
    </div>
  )
}

export default BlogInfo
