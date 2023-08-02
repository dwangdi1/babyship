import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   lineItems: []
};

export const fetchCart = createAsyncThunk("fetchCart", async () => {
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/orders/cart", {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      console.log(err);
   }
});

const handelNewAddToCart = (visitorOrder, { product, quantity, productId, id }) => {
   let lineItem = visitorOrder.find((lineItem) => {
      return lineItem.productId === productId;
   });
   if (lineItem) {
      lineItem.quantity += quantity;
   } else {
      visitorOrder.push({ product, quantity, productId, id });
   }
};

const handelNewRemoveFromCart = (visitorOrder, { product, quantityToRemove }) => {

   let index = visitorOrder.findIndex((lineItem) => {
      return lineItem.productId === product.id;
   });

   if (index !== -1) {
      visitorOrder[index].quantity -= quantityToRemove;
   }
   console.log("updated: index", index, "new visitorOrder[index].quantity", visitorOrder[index].quantity);
   if (visitorOrder[index].quantity === 0) {
      visitorOrder.splice(index, 1);
   }
};

export const addToCart = createAsyncThunk("addToCart", async ({ product, quantity }) => {
   try {
      const token = window.localStorage.getItem("token");
      if (token) {
         const response = await axios.post(
            "/api/orders/cart",
            { product, quantity },
            {
               headers: {
                  authorization: token
               }
            }
         );
         return response.data;
      } else {
         const visitorOrderString = window.localStorage.getItem("visitorOrder");
         let visitorOrder;
         if (visitorOrderString) {
            visitorOrder = JSON.parse(visitorOrderString);
            let productId = product.id;
            let id = visitorOrder.length;
            handelNewAddToCart(visitorOrder, { product, quantity, productId, id });
            let updateVisitorOrderString = JSON.stringify(visitorOrder);
            window.localStorage.setItem("visitorOrder", updateVisitorOrderString);
         } else {
            visitorOrder = [];
            let productId = product.id;
            let id = 0;
            visitorOrder.push({ product, quantity, productId, id });
            let updateVisitorOrderString = JSON.stringify(visitorOrder);
            window.localStorage.setItem("visitorOrder", updateVisitorOrderString);
         }

         return { lineItems: visitorOrder };
      }
   } catch (err) {
      console.log(err);
   }
});

export const removeFromCart = createAsyncThunk("removeFromCart", async ({ product, quantityToRemove }) => {
   try {

      const token = window.localStorage.getItem("token");
      if (token) {
         const response = await axios.put(
            "/api/orders/cart",
            { product, quantityToRemove },
            {
               headers: {
                  authorization: token
               }
            }
         );
         return response.data;
      } else {
         const visitorOrderString = window.localStorage.getItem("visitorOrder");
         let visitorOrder;
         visitorOrder = JSON.parse(visitorOrderString);
         handelNewRemoveFromCart(visitorOrder, { product, quantityToRemove });
         let updateVisitorOrderString = JSON.stringify(visitorOrder);
         window.localStorage.setItem("visitorOrder", updateVisitorOrderString);
         return { lineItems: visitorOrder };
      }
   } catch (ex) {
      console.log(err);
   }
});

export const checkoutCart = createAsyncThunk("checkoutCart", async () => {
   try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put("/api/orders/checkout", null, {
         headers: {
            authorization: token
         }
      });
      return response.data;
   } catch (err) {
      console.log(err);
   }
});

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      logoutHideCart: (state) => {
         return {};
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchCart.fulfilled, (state, action) => {
         return action.payload;
      });
      builder.addCase(addToCart.fulfilled, (state, action) => {
         if (action.payload) {
            return action.payload;
         }
      });
      builder.addCase(removeFromCart.fulfilled, (state, action) => { 
         return action.payload;
      });
      builder.addCase(checkoutCart.fulfilled, (state, action) => {
         return initialState;
      });
   }
});

export const { logoutHideCart } = cartSlice.actions;

export default cartSlice.reducer;