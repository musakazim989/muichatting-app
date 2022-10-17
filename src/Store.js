import { configureStore } from "@reduxjs/toolkit"
import activeChatSlice from "./slice/activeChatSlice"

export const store = configureStore({
  reducer: {
    activeChat: activeChatSlice,
  },
})
