import { createSlice } from "@reduxjs/toolkit";

const configUser = createSlice({
  name: "configUser",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setUser(state, action) {
      return { ...state, user: action.payload };
    },
    setToken(state, action) {
      
      return { ...state, token: action.payload };
    },
  },
});
export default configUser.reducer;
export const { setUser, setToken } = configUser.actions;
