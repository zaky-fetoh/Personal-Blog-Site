import { configureStore } from "@reduxjs/toolkit";
import {reducer as auth} from "./auth/auth-slice"

export const store = configureStore({
    reducer:{
        auth,
    }
})