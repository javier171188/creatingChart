import { configureStore } from "@reduxjs/toolkit";
import plusNode from "./slices/plusNode";

export default configureStore({
  reducer: {
    plusNode,
  },
});
