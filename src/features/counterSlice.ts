import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface CounterState{
    count:number
}
const initialState = {
    count :0
}
export const counterSlice = createSlice({
    name:"counter", 
    initialState,
    reducers:{
        increase:(state)=>{
            state.count = state.count+1
        },
        increaseMore:(state,action:PayloadAction<number>)=>{
            state.count = state.count+action.payload
        },
        decrease:(state)=>{
            if(state.count > 0){
                state.count = state.count-1
            }
        }
    }
})

export const {increase,increaseMore,decrease } = counterSlice.actions

export default counterSlice.reducer;