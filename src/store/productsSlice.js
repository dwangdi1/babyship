import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const fetchProducts = createAsyncThunk("fetchProducts", async() => {
    const products = await axios.get("/api/products");
    return products.data
});


const productSlice = createSlice({
    name:"products",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state,action) => {
            return action.payload;
        })
    }
});

export default productSlice.reducer;