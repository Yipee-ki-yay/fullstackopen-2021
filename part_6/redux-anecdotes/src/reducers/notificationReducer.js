const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    default:
      return state
  }
}

export const setNotificationMessage = (notification, sec) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    setTimeout(() => 
      dispatch({
        type: 'SET_NOTIFICATION',
        data: ''
      }), 
      sec * 1000
    )
  }
}

export default notificationReducer