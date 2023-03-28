import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import CartSlice from "./Slices/CartSlice";

export const store = configureStore({
    reducer: {
        products: ProductSlice,
        cart: CartSlice
    }
})
