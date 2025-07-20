import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type dialogType = "delete" | "confirm" | "edit";

export interface globalSliceState {
  isOpenDialog: boolean;
  id: number | null;
  //! Drawer
  isOpenDrawer: boolean;
}

const initialState: globalSliceState = {
  isOpenDialog: false,
  id: null,
  isOpenDrawer: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    //! Dialog
    openDialog: (state, actions: PayloadAction<number>) => {
      state.isOpenDialog = true;
      state.id = actions.payload;
    },
    closeDialog: (state) => {
      state.isOpenDialog = false;
      state.id = null;
    },
    //! Drawer
    openDrawer: (state) => {
      state.isOpenDrawer = true;
    },
    closeDrawer: (state) => {
      state.isOpenDrawer = false;
    },
  },
});

export const { openDialog, closeDialog, openDrawer, closeDrawer } = globalSlice.actions;
export default globalSlice.reducer;
