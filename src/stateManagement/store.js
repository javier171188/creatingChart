import { configureStore } from "@reduxjs/toolkit";
import reactFlow from "./slices/reactFlow";

export default configureStore({
  reducer: {
    reactFlow,
  },
});
