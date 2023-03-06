import { configureStore } from "@reduxjs/toolkit";
import { reducer as auth } from "./auth/auth-slice"
import { reducer as blog } from "./blog/blog-slice"

export const store = configureStore({
    reducer: {
        auth, blog
    }
})