import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetAllProduct from "../../APIServices/GetAllProduct";
import Search from "../../APIServices/Search";
import GetProductbyCategory from "../../APIServices/GetProductbyCategory";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
    query: '',
    selectedCategory: ''
}  

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
      try {
        const data = await GetAllProduct();
        return data;
      } catch (error) {
        console.log(error)
      }
    }
  );
 
export const fetchProductSearch = createAsyncThunk(
  'products/fetchProductSearch',
  async (query) => {
    try {
      const data = await Search(query);
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchProductCategory = createAsyncThunk(
  'products/fetchProductCategory',
  async (selectedCategory) => {
    try {
      const data = await GetProductbyCategory(selectedCategory);
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers(builder){
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.status = 'loading'
            console.log(action)
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.products = action.payload
            console.log(state.products)
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
            console.log(action)
        })
    }
})


export default ProductSlice.reducer;