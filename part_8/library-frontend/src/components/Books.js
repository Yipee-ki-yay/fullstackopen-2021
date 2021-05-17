import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  let books = []
  const result = useQuery(ALL_BOOKS) 
  if (result.data && result.data.allBooks) {
    books = [...result.data.allBooks]
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books