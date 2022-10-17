import { configureStore } from "@reduxjs/toolkit"
import activeChatSlice from "./components/slice/activeChatSlice"

export const store = configureStore({
  reducer: {
    activeChat: activeChatSlice,
  },
})
