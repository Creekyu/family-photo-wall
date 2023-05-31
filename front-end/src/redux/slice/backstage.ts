import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKey: 'add',
  isLogin: false,
  curPage: 1,
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
    setCurPage: (state, action) => {
      state.curPage = action.payload;
    },
  },
});

export const { setSelectedKey, setIsLogin, setCurPage } =
  backStageSlice.actions;
export default backStageSlice.reducer;
