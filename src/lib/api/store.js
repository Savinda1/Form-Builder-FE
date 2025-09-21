// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { formApi } from "@/lib/api/api";
import formdataReducer from "../api/features/formdataSlice"
import customValueReducer from "../api/features/customValue"


export const store = configureStore({
  reducer: {
    [formApi.reducerPath]: formApi.reducer,
    
    formdata: formdataReducer,
    customValue: customValueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formApi.middleware),
});

setupListeners(store.dispatch);