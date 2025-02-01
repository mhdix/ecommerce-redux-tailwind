import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const instance = axios.create({ baseURL: "https://fakestoreapi.com" });

const getAsyncProduct = createAsyncThunk(
  "product/getAsyncProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const getAsyncProductCart = createAsyncThunk(
  "product/getAsyncProductCart",
  async (id , {rejectWithValue}) => {
    try{
      const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
      return response.data
    }catch(error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  products: [],
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(getAsyncProduct.pending, (state) => {
        state.isLoading = true;
        state.products = [];
        state.error = "";
      })
      .addCase(getAsyncProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.payload;
      })
      .addCase(getAsyncProductCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(getAsyncProductCart.pending, (state) => {
        state.isLoading = true;
        state.products = [];
        state.error = "";
      })
      .addCase(getAsyncProductCart.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export { getAsyncProduct, getAsyncProductCart };

export default productSlice.reducer;
