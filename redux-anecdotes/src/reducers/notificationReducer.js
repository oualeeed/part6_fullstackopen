import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers:{
    notify(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const setNotification = (text, time) => {
  return dispatch => {
    setTimeout(()=>dispatch(removeNotification()),time)
    return dispatch(notify(text))
  }
}

export const { notify, removeNotification } = notificationReducer.actions
export default notificationReducer.reducer