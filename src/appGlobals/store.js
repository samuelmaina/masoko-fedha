import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi, cryptoNewsApi } from "../services";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
