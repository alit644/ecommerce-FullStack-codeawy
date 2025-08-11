import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginSlice from "./features/loginSlice";
import authSlice from "./features/authSlice";
import registerSlice from "./features/registerSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import paginationSlice from "./features/paginationSlice";
import filtersSlice from "./features/filtersSlice";
import { createProductApi } from "./services/createProductApi";
import { createCategoryApi } from "./services/createCategoryApi";
import { createOrderApi } from "./services/createOrderApi";
import { createProfileApi } from "./services/createProfileApi";

const persistConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    auth: authSlice,
    cart: persistedCart,
    global: globalSlice,
    pagination: paginationSlice,
    filters: filtersSlice,
    [createProductApi.reducerPath]: createProductApi.reducer,
    [createCategoryApi.reducerPath]: createCategoryApi.reducer,
    [createOrderApi.reducerPath]: createOrderApi.reducer,
    [createProfileApi.reducerPath]: createProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createProductApi.middleware,
      createCategoryApi.middleware,
      createOrderApi.middleware,
      createProfileApi.middleware
    ),
});

//! Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const persistor = persistStore(store);
