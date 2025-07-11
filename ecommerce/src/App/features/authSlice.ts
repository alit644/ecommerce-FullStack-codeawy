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
    login: (state , action) => {
      state.isAuthenticated = true;
      cookieManager.set("jwtToken", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      cookieManager.remove("jwtToken");
    },
  },
});

export const {login , logout} = authSlice.actions;
export default authSlice.reducer;
