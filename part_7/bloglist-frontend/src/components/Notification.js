import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notificationMessage = useSelector(state => state.notification)

  if (!notificationMessage) {
    return null
  }

  return (
    <Alert severity="success">
      {notificationMessage}
    </Alert>
  )
}

export default Notification