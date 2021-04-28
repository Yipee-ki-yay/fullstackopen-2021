const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    default:
      return state
  }
}

export const setNotificationMessage = (notification) => ({
  type: 'SET_NOTIFICATION',
  data: notification
})

export default notificationReducer