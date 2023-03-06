import{ createAsyncThunk, createSlice }from"@reduxjs/toolkit";
import blogAPI from "./blog-api"


const initialState = {
    loading:false, 
    error:null,
    blogs:[], 
}

const fetchBlogs = createAsyncThunk("blog/fetchblog",async(_,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;

})

const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{},
})

export const reducer = blogSlice.reducer;
export const actions = {
    ...blogSlice.actions,

}

