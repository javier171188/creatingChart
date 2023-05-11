import { createSlice } from "@reduxjs/toolkit";

export const plusNode = createSlice({
  name: "plusNode",
  initialState: {
    node: null,
    createdType: null,
  },
  reducers: {
    setNode(state, { payload }) {
      state.node = payload;
      return state;
    },
    setCreatedType(state, { payload }) {
      state.createdType = payload;
      return state;
    },
  },
});

export const { setNode, setCreatedType } = plusNode.actions;
export default plusNode.reducer;
