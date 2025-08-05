import { createSlice } from "@reduxjs/toolkit";
import cookieManager from "../../utils/cookieManager";
import type { IUserInfo } from "../../interfaces";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: !!cookieManager.get("jwt") && !!cookieManager.get("user"),
  // isAuthenticated: !!cookieManager.get("jwtToken") && !!cookieManager.get("user"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      //! تخزين التوكن في الكوكي
      cookieManager.set("jwtToken", action.payload.jwt, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      });
      //! تخزين معلومات المستخدم في الكوكي
      cookieManager.set(
        "user",
        JSON.stringify(action.payload.user as IUserInfo),
        {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        }
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      // cookieManager.remove("jwtToken");
      cookieManager.remove("jwt");
      cookieManager.remove("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
