import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./Slices/AuthenticationSlice";
import orderSlice from "./Slices/OrderSlice";

export const store = configureStore({
  reducer: {
    auth: AuthenticationSlice,
    order: orderSlice,
  },
});
