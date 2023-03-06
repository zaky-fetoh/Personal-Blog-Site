import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as authAPI from "./auth-api"

const initialState = {
    token: "",
    error: null,
    logedIn: false,
    loading: false,
}

const loginThunk = createAsyncThunk("auth/login", async (loginInfo, thunkAPI) => {
    try {
        const res = await authAPI.login(loginInfo);
        return {
            token: res.JWT_Token,
            login: true,
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
})



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        //Login Hundlers 
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true;            
        }); 
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            console.log(action)
            state.loading = false;
            state.error = null;
            state.token = action.payload.token;
            state.logedIn = true;
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload;
            state.loading = false;
            state.logedIn = false;
            state.token = "";
        });
    }
})



export const reducer = authSlice.reducer;
export const actions = {
    login: loginThunk,
    ...authSlice.actions
}
