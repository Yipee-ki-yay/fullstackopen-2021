import React from 'react'
import {
  Link
} from 'react-router-dom'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <TableRow style={blogStyle} className="blog">
      <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell>
    </TableRow>
  )
}

export default Blog