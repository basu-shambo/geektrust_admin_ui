import {createSlice,PayloadAction,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

export interface userInterface {
    id:string,
    name:string,
    email:string,
    role:string
}

export interface UserObject {
    [key:string] : userInterface
}


interface UserStateInterface{
    loading:boolean,
    users:{
        [key:string] : userInterface
    },
    error:string
}

const initialState:UserStateInterface = {
    loading:false,
    users:{},
    error:""
}

export const getUsers = createAsyncThunk(
    'user/fetchUser',
    async (thunkAPI)=>{
        const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        return response.data.reduce((obj:any,user:userInterface)=>Object.assign(obj,{[user.id]:user}),{})
    }
)
export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.loading= false;
            state.users =action.payload;
            state.error = '';
        })
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.loading =false;
            state.users = {}
            state.error = action.error.message?action.error.message:"";
        })
    }
})

export default userSlice.reducer;

