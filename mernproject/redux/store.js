import { configureStore } from "@reduxjs/toolkit";
import configUser from "./slices/configUser";
import cartSection from "./slices/cartSlice";
import quantitySlice from "./slices/quantitySlice";
import userNav from "./slices/userNav";
import adminNav from "./slices/adminNav";
import paymentStatus from "./slices/khalti.js";
import { api } from "./slices/api.js";
export const store = configureStore({
  reducer: {
    configUser,
    cartSection,
    quantitySlice,
    adminNav,
    userNav,
    paymentStatus,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
