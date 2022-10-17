import { createSlice } from "@reduxjs/toolkit"

export const activeChatClice = createSlice({
  name: "activeChat",
  initialState: {
    active: "",
  },
  reducers: {
    activeChat: (state, action) => {
      state.active = action.payload
    },
  },
})

export const { activeChat } = activeChatClice.actions

export default activeChatClice.reducer
