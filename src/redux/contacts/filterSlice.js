import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { filterValue: '' },
  reducers: {
    setFilter(state, action) {
      state.filterValue = action.payload;
    },
  },
});

export const getFilterValue = state => state.filter.filterValue;

export const filterReducer = filterSlice.reducer;

export const { setFilter } = filterSlice.actions;
