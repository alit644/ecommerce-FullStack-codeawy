import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type dialogType = "delete" | "confirm" | "edit";

export interface globalSliceState {
  isOpenDialog: boolean;
  id: number | string | null;
  //! Drawer sidebar
  isOpenDrawer: boolean;
  //! Drawer filter
  isFilterDrawerOpen: boolean;
  
}

const initialState: globalSliceState = {
  isOpenDialog: false,
  id: null,
  isOpenDrawer: false,
  isFilterDrawerOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    //! Dialog
    openDialog: (state, actions: PayloadAction<number | string>) => {
      state.isOpenDialog = true;
      state.id = actions.payload;
    },
    closeDialog: (state) => {
      state.isOpenDialog = false;
      state.id = null;
    },
    //! Drawer sidebar
    openDrawer: (state) => {
      state.isOpenDrawer = true;
    },
    //! Drawer filter
    openFilterDrawer: (state) => {
      state.isFilterDrawerOpen = true;
    },
    closeDrawer: (state) => {
     state.isOpenDrawer = false;
     state.isFilterDrawerOpen = false;
   },
    
  },
});

export const { openDialog, closeDialog, openDrawer, closeDrawer, openFilterDrawer } = globalSlice.actions;
export default globalSlice.reducer;
