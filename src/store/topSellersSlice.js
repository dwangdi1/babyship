import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopSellers = createAsyncThunk("fetchTopSellers", async() => {
    const response = await axios.get("/api/products/top-sellers");
    return response.data;
})

const topSellers = createSlice({
    name:"topSellers",
    initialState:[],
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchTopSellers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export default topSellers.reducer



