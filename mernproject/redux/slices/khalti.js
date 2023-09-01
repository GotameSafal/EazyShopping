import { createSlice } from "@reduxjs/toolkit";
const paymentStatus = createSlice({
  name: "paymentStatus",
  initialState: {
    pidx:'notpaid',
  },
  reducers: {
    setPidx(state, action) {
      state.pidx = action.payload;
    },
  },
});
export default paymentStatus.reducer;
export const { setPidx } = paymentStatus.actions;
