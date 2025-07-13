import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type dialogType = "delete" | "confirm" | "edit";

export interface globalSliceState {
  isOpenDialog: boolean;
  id: number | null;
}

const initialState: globalSliceState = {
  isOpenDialog: false,
  id: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openDialog: (state, actions: PayloadAction<number>) => {
      state.isOpenDialog = true;
      state.id = actions.payload;
    },
    closeDialog: (state) => {
      state.isOpenDialog = false;
      state.id = null;
    },
  },
});

export const { openDialog, closeDialog } = globalSlice.actions;
export default globalSlice.reducer;
