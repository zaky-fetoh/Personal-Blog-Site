import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as authAPI from "./auth-api"

const initialState = {
    token: "",
    error: null,
    logedIn: false,
    loading: false,
}

const loginThunk = createAsyncThunk("auth/login",
    async (loginInfo, thunkAPI) => {
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

const signUpThank = createAsyncThunk("auth/signUp",
    async (signupInfo, thunkAPI) => {
        try {
            const res = await authAPI.signUp(signupInfo);
            return {
                userId: res.user_id
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(res.message)
        }
    })


const verifyTokenThunk = createAsyncThunk("auth/verifyToken",
    async (_, thunkAPI) => {
        try {
            const login = await authAPI.verifyToken()
            return login
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    })



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("token");
            return initialState;
        },
    },
    extraReducers: (builder) => {
        //Login Hundlers 
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = action.payload.token;
            state.logedIn = true;
            localStorage.setItem("token", state.token)

        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.logedIn = false;
            state.token = "";
        });
        ///Adding User
        builder.addCase(signUpThank.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signUpThank.fulfilled, (state, action) => {
            state.error = "User Created, Plase Signin";
            state.loading = false;
        });
        builder.addCase(signUpThank.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.logedIn = false;
            state.token = "";
        });
        //verifying token
        builder.addCase(verifyTokenThunk.fulfilled, (state, action) => {
            state.token = localStorage.getItem("token");
            state.logedIn = action.payload;
            state.loading = false;
            state.error = null;
        })

    }
})



export const reducer = authSlice.reducer;
export const actions = {
    login: loginThunk,
    signup: signUpThank,
    ...authSlice.actions
}
