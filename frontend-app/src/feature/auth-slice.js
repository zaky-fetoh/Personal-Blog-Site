import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authAPI  from "./auth-api"

const initialState = {
    token: "", 
    error:"",
    logedIn:false,
    loading:false,
}

const loginThunk = createAsyncThunk("auth/login",async(loginInfo, thunkAPI)=>{
    
    try{
        const res = authAPI.login(loginInfo);
        return{
            token:res.JWT_Token, 
            login: true,
        }
    }catch(e){
        thunkAPI.rejectWithValue(e.message);
    }
})



const authSlice = createSlice({
    name:"auth", 
    initialState,
    extraReducers:(builer)=>{
        //Login Hundlers 
        builder.addCase(loginThunk.pending,(state, action)=>{
            state.loading = true;
        });
        builer.addCase(loginThunk.fulfilled,(state,action)=>{
            state.loading = false; 
            state.error ="";
            state.token = action.payload.token;
            state.logedIn = true;
        });
        builer.addCase(loginThunk.rejected,(state, action)=>{
            state.error = action.error ; 
            state.loading = false; 
            state.logedIn = false;
            state.token = "";
        });
    }
})



export const reducer = authSlice.reducer ; 
export const actions ={
    login:  loginThunk,
}
