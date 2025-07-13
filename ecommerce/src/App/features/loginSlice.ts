import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import api from "../../Api/axios";
import type { IFormInput } from "../../pages/Auth/Login";
import type { AxiosError } from "axios";
import type { IError } from "../../interfaces";

export const loginUser = createAsyncThunk(
  "namespace/loginUser",
  async (user: IFormInput, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await api.post("/api/auth/local", user);
      return data;
    } catch (err) {
      const error = err as AxiosError;

      const message =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error.response?.data as any)?.error?.message ||
        "حدث خطأ أثناء تسجيل الدخول";

      return rejectWithValue(message);
    }
  }
);

export interface loginSliceState {
  isLoading: boolean;
  error: AxiosError<IError> | null;
  data: {
    [key: string]: string;
  } | null;
}

const initialState: loginSliceState = {
  isLoading: false,
  error: null,
  data: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        //* authSlice 
        // //! تخزين التوكن في الكوكي
        // cookieManager.set("jwtToken", action.payload.jwt, {
        //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        // });
        // //! تخزين معلومات المستخدم في الكوكي
        // cookieManager.set("user", JSON.stringify(action.payload.user as IUserInfo), {
        //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        // });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AxiosError<IError>;
      });
  },
});

export default loginSlice.reducer;
