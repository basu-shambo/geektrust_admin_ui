import {configureStore} from "@reduxjs/toolkit";

//Importing the slices
import counterReducer from "../features/counterSlice"
import userSlice from "../features/userSlice";
export const store = configureStore({
    reducer:{
        counter:counterReducer,
        users:userSlice
    }
})

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch; 