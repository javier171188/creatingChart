import { createSlice } from "@reduxjs/toolkit";

export const reactFlow = createSlice({
  name: "reactFlow",
  initialState: {
    activePlusNodeId: null,
    reactFlowInstance: null,
  },
  reducers: {
    setActivePlusNodeId(state, { payload }) {
      state.activePlusNodeId = payload;
      return state;
    },
    setReactFlowInstance(state, { payload }) {
      state.reactFlowInstance = payload;
      return state;
    },
  },
});

export const { setActivePlusNodeId, setReactFlowInstance } = reactFlow.actions;
export default reactFlow.reducer;
