import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filtersSliceState {
  brand: string[];
  category: string[];
  price: string[];
  tags: string[];
  query: string;
}

const initialState: filtersSliceState = {
  brand: [],
  category: [],
  price: [],
  tags: [],
  query: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<filtersSliceState>) => {
      state.brand = action.payload.brand;
      state.category = action.payload.category;
      state.price = action.payload.price;
      state.tags = action.payload.tags;
      state.query = action.payload.query;
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const { setFilter, resetFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
