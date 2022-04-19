import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});
