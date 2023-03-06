import { configureStore } from "@reduxjs/toolkit";
import {reducer} from "./auth/auth-slice"

export const store = configureStore({
    auth:reducer,
})