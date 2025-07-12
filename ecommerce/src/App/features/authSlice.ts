import { createSlice } from "@reduxjs/toolkit";
import cookieManager from "../../utils/cookieManager";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: !!cookieManager.get("jwtToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      // cookieManager.set("jwtToken", action.payload.jwt, {
      //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      // });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      cookieManager.remove("jwtToken");
      cookieManager.remove("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
