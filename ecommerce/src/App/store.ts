import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import loginSlice from "./features/loginSlice";
import authSlice from "./features/authSlice";
import  registerSlice  from "./features/registerSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    auth: authSlice,
  },
});

//! Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
