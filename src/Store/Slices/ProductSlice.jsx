import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetAllProduct from "../../APIServices/GetAllProduct";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
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