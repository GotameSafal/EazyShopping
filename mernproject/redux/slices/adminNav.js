import { createSlice } from "@reduxjs/toolkit";
const adminNav = createSlice({
  name: "adminNav",
  initialState: {
    sidebar: true,
    screen: undefined,
  },
  reducers: {
    closeNavbar(state) {
      state.sidebar = false;
    },
    openNavbar(state) {
      state.sidebar = true;
    },
    setScreen(state, action) {
      state.screen = action.payload;
    },
  },
});
export default adminNav.reducer;
export const { closeNavbar, openNavbar, setScreen } = adminNav.actions;
