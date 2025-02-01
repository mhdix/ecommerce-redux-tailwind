import { configureStore } from "@reduxjs/toolkit";
import productReducer from './product/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    productCart: productReducer
  },
});

export default store