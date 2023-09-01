import { createSlice } from "@reduxjs/toolkit";
const userSideNav = createSlice({
  name: "userSideNav",
  initialState: {
    sidebar: false,
    screen: undefined,
  },
  reducers: {
    closeUserSideBar(state) {
      state.sidebar = false;
    },
    openUserSidebar(state) {
      state.sidebar = true;
    },
    setUserScreen(state, action) {
      state.screen = action.payload;
    },
  },
});
export default userSideNav.reducer;
export const { closeUserSideBar, openUserSidebar, setUserScreen } =
  userSideNav.actions;

  