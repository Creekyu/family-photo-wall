import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 后台
  selectedKey: 'add',
  isLogin: false,
  // top header
  chosen: 0,
};

const universalSlice = createSlice({
  name: 'universal',
  initialState,
  reducers: {
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setChosen: (state, action) => {
      state.chosen = action.payload;
    },
  },
});

export const { setSelectedKey, setIsLogin, setChosen } = universalSlice.actions;
export default universalSlice.reducer;
