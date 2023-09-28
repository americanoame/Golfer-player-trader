import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
    signInStart: (state) => {
        state.loading = true;
    },
    signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
    },
    signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    forgotPassword: (state) => {
        state.loading = true;
        state.error = null;
      },


     resetPassword: (state) => {
        state.loading = true;
        state.error = null;
     },
      
      

    signOut: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
    },
   },
});

export const {
    signInStart, 
    signInSuccess, 
    signInFailure, 
    signOut, 
    forgotPassword,
    resetPassword,
} = userSlice.actions;

export default userSlice.reducer
