import { createSlice } from "@reduxjs/toolkit";
const quantitySlice = createSlice({
  name: "quantitySlice",
  initialState: 0,
  reducers: {
    increment(state) {
      if (state >= 5) return;
      state += 1;
    },
    decrement(state) {
      if (state === 0) return;
      state -= 1;
    },
  },
});
export default quantitySlice.reducer;
export const { increment, decrement } = quantitySlice.actions;
