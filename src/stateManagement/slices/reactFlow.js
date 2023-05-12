import { createSlice } from "@reduxjs/toolkit";

export const reactFlow = createSlice({
  name: "reactFlow",
  initialState: {
    activePlusNodeId: null,
    latestNodeId: null,
  },
  reducers: {
    setActivePlusNodeId(state, { payload }) {
      state.activePlusNodeId = payload;
      return state;
    },
    setLatestNodeId(state, { payload }) {
      state.latestNodeId = payload;
      return state;
    },
  },
});

export const { setActivePlusNodeId, setLatestNodeId } = reactFlow.actions;
export default reactFlow.reducer;
