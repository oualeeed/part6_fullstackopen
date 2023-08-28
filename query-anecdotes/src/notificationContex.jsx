import { createContext, useContext, useReducer } from "react"

const NotificationContext = createContext()

const notificationRedcucer = (state, action) => {
    switch(action.type) {
      case 'NOTIFY': {
        return action.payload
      }
      case 'REMOVE_NOTIF': {
        return null
      }
      default: return state
    }
  }

  
export const NotificationContextProvider = (props) => {
const [notification, notificationDispatch] = useReducer(notificationRedcucer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const UseNotification = (message) => {
    const [notification, notificationDispatch] = useContext(NotificationContext)
    
    setTimeout(() => notificationDispatch({ type: 'REMOVE_NOTIF' }), 5000)
    return notificationDispatch({ type: 'NOTIFY', payload: message })

    return notification

}

export default NotificationContext