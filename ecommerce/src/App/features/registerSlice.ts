import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import api from "../../Api/axios";
import type { IFormInput } from "../../pages/Auth/Register";
import type { AxiosError } from "axios";
import type { IError } from "../../interfaces";
import cookieManager from "../../utils/cookieManager";

export const registerUser = createAsyncThunk(
  "namespace/registerUser",
  async (user: IFormInput, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await api.post("/api/auth/local/register", user);
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

export interface registerSliceState {
  isLoading: boolean;
  error: AxiosError<IError> | null;
  data: {
    [key: string]: string;
  } | null;
}

const initialState: registerSliceState = {
  isLoading: false,
  error: null,
  data: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        //! تخزين التوكن في الكوكي
        cookieManager.set("jwtToken", action.payload.jwt, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AxiosError<IError>;
      });
  },
});

export default registerSlice.reducer;
