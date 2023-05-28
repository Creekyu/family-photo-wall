import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKey: 'add',
};

const backStageSlice = createSlice({
  name: 'backstage',
  initialState,
  reducers: {
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
  },
});

export const { setSelectedKey } = backStageSlice.actions;
export default backStageSlice.reducer;
