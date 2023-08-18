import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchUsers = createAsyncThunk("fetchUsers", async()=>{
    try{
        const token = window.localStorage.getItem('token');
        const response = await axios.get('/api/admin/users', {
            headers: {
                authorization: token
            }
        }
        );
        return response.data;
    }catch(err){
        console.log(err)
    }
});


export const deleteUser = createAsyncThunk("deleteUser", async (user, {rejectWithValue}) => {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.delete(`/api/admin/users/${user.id}`, {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
    else {
      return rejectWithValue();
    }
  }
);

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            return state.filter(user => user.id !== action.payload.id);
        })
    }
})


export default usersSlice.reducer;