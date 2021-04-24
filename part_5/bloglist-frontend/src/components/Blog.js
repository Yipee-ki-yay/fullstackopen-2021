import React, { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const isShowRemoveButton = (user && user.name && blog.user && blog.user.name) && user.name === blog.user.name
  console.log(user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClickLikeBtn = () => {
    handleUpdateBlog(blog)
  }

  const handleClickRemoveBtn = () => {
    const isDeleteBlog = window.confirm('Do you want to delete blog?')
    if (isDeleteBlog) {
      handleDeleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      </div>
      {visible &&
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleClickLikeBtn}>like</button></div>
          <div>{blog.user && blog.user.username}</div>
          {isShowRemoveButton && <button onClick={handleClickRemoveBtn}>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog