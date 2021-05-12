import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ flag }) => {
  const notificationMessage = useSelector(state => state.notification)

  console.log('message', notificationMessage)
  if (!notificationMessage) {
    return null
  }

  return (
    <div className={flag}>
      {notificationMessage}
    </div>
  )
}

export default Notification