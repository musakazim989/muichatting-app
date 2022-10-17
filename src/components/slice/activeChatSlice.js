import { createSlice } from "@reduxjs/toolkit"

export const activeChatClice = createSlice({
  name: "activeChat",
  initialState: {
    active: null,
  },
  reducers: {
    activeChat: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { activeChat } = activeChatClice.actions

export default activeChatClice.reducer
