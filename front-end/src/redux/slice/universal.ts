import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 后台
  selectedKey: 'add',
  isLogin: false,
  // top header
  chosen: 0,
  randList: [] as number[],
};

const universalSlice = createSlice({
  name: 'universal',
  initialState,
  reducers: {
    generateRandList: (state) => {
      const randList = [] as number[];
      let rand = Math.floor(1 + Math.random() * (9 - 1)); // 生成1-8的随机数
      for (let i = 0; i < 4; i++) {
        while (randList.includes(rand)) {
          rand = Math.floor(1 + Math.random() * (9 - 1));
        }
        randList.push(rand);
      }
      state.randList = randList;
    },
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

export const { setSelectedKey, setIsLogin, setChosen, generateRandList } =
  universalSlice.actions;
export default universalSlice.reducer;
