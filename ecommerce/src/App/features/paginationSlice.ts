import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface paginationSliceState {
  page: number;
  pageSize: number,
  count: number,
}

const initialState: paginationSliceState = {
  page: 1,
  pageSize: 3,
  count: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setPage, setPageSize, setCount } = paginationSlice.actions;
export default paginationSlice.reducer;