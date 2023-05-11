import { createSlice } from "@reduxjs/toolkit";

export const plusNode = createSlice({
  name: "plusNode",
  initialState: {
    node: null,
  },
  reducers: {
    setNode(state, { payload }) {
      state.node = payload;
      return state;
    },
  },
});

export const { setNode } = plusNode.actions;
export default plusNode.reducer;
