import React from 'react'
import {
  useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogInfo = ({ handleUpdateBlog }) => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  console.log('blog', blog)

  const handleClickLikeBtn = () => {
    handleUpdateBlog(blog)
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
      </div>
    </div>
  )
}

export default BlogInfo
