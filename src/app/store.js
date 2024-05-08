import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-List/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
