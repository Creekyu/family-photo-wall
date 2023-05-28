import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKey: 'add',
  isLogin: false,
};

const backStageSlice = createSlice({
  name: 'backstage',
  initialState,
  reducers: {
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setSelectedKey, setIsLogin } = backStageSlice.actions;
export default backStageSlice.reducer;
