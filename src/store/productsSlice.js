import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
   const products = await axios.get("/api/products");
   return products.data;
});

export const createProduct = createAsyncThunk("createProduct", async (product, { rejectWithValue }) => {
   const token = window.localStorage.getItem("token");
   if (token) {
      const response = await axios.post("/api/admin/products", {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } else {
      return rejectWithValue({ message: "Token not available" });
   }
});

export const editProduct = createAsyncThunk("editProduct", async (product, { rejectWithValue }) => {
   const token = window.localStorage.getItem("token");
   if (token) {
      try {
         const response = await axios.put(`/api/admin/products/${product.id}`, product, {
            headers: {
               authorization: token
            }
         });
         return response.data;
      } catch (error) {
         console.log(error);
         return rejectWithValue({ message: "Error occurred while editing the product" });
      }
   } else {
      return rejectWithValue({ message: "Token not available" });
   }
});
export const deleteProduct = createAsyncThunk("deleteProduct", async (product, { rejectWithValue }) => {
   const token = window.localStorage.getItem("token");
   if (token) {
      const response = await axios.delete(`/api/admin/products/${product.id}`, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } else {
      return rejectWithValue({ message: "Token not available" });
   }
});

export const updateProductQuantity = createAsyncThunk("updateProductQuantity", async ({ product, quantity }) => {
   try {
      const token = window.localStorage.getItem("token");
      if(token){
         const response = await axios.put(
            `/api/products/${product.id}`,
            { product, quantity },
            {
               headers: {
                  authorization: token
               }
            }
         );
         return response.data;

      }else{
         const response = await axios.put(
            `/api/products/${product.id}`,
            { product, quantity },
         );
         console.log('response.data:',response.data)
         return response.data;
      }
      
   } catch (err) {
      console.log(err);
   }
});


export const createReview = createAsyncThunk("createReview", async({newReview, prodId}) => {
    try {
        console.log(prodId)
        const token = window.localStorage.getItem("token");
        if(token){
            const response = await axios.post(`/api/products/${prodId}/review`, {newReview}, {headers : {authorization : token}});
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
})

const productSlice = createSlice({
   name: "products",
   initialState: [],
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         return action.payload;
      });
      builder.addCase(createProduct.fulfilled, (state, action) => {
         state.push(action.payload);
      });
      builder.addCase(editProduct.fulfilled, (state, action) => {
         const index = state.findIndex((product) => product.id === action.payload.id);
         state[index] = action.payload;
      });
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
         return state.filter((product) => product.id !== action.payload.id);
      });
      builder.addCase(updateProductQuantity.fulfilled, (state, action) => {
         return state.map((product) => (product.id === action.payload.id ? action.payload : product));
      });
      builder.addCase(createReview.fulfilled, (state,action) => {
        const updatedProduct = state.find((prod) => prod.id === action.payload.productId);
        updatedProduct.reviews.push(action.payload.review)
      })
   }
});

export default productSlice.reducer;