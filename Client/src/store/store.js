import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/user/User.slice'
import  messageSlice  from './slice/message/Message.slice';
import  socketSlice  from './slice/socket/socket.slice';

export const store = configureStore({
  reducer: {
    userSlice,
    messageSlice,
    socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;