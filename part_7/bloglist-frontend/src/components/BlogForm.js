import React, { useState } from 'react'
import {
  TextField,
  Button
} from '@material-ui/core'

const BlogForm = ({ handleAddBlog }) => {
  const [blogFields, setBlogFields] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSetBlogFields = ({ name, value }) => setBlogFields({ ...blogFields, [name]: value })

  const handleSubmitBlogForm = async (event) => {
    event.preventDefault()

    await handleAddBlog(blogFields)
    for (var key in blogFields) {
      // eslint-disable-next-line no-prototype-builtins
      if (blogFields.hasOwnProperty(key)) {
        setBlogFields({ ...blogFields, [key]: '' })
      }
    }
  }

  return (
    <form className="form-new-blog" onSubmit={handleSubmitBlogForm}>
      <div>
        <TextField
          value={blogFields.title}
          onChange={({ target }) => handleSetBlogFields(target)}
          type="text"
          name="title"
          id="title"
          label="title"
        />
      </div>
      <div>
        <TextField
          value={blogFields.author}
          onChange={({ target }) => handleSetBlogFields(target)}
          type="text"
          name="author"
          id="author"
          label="author"
        />
      </div>
      <div>
        <TextField
          value={blogFields.url}
          onChange={({ target }) => handleSetBlogFields(target)}
          type="text"
          name="url"
          id="url"
          label="url"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">create</Button>
    </form>
  )
}

export default BlogForm
