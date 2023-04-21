import {createSlice,PayloadAction,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

//This is the interface that will store the user infromation
export interface userInterface {
    id:string,
    name:string,
    email:string,
    role:string
}

//This is the interface that will define the how all the users will be stored in a single variable
export interface UserObject {
    [key:string] : userInterface
}

//This will represent the redux store state that will store the userInterface
interface UserStateInterface{
    loading:boolean,
    users:UserObject,
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
        removeUser:(state,action:PayloadAction<string>)=>{
            const userState = JSON.parse(JSON.stringify(state.users));
            delete userState[action.payload]
            state.users = userState;
        }
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

export const {removeUser} = userSlice.actions;

export default userSlice.reducer;

