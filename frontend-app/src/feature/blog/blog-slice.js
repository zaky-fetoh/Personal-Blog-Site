import{ createAsyncThunk, createSlice }from"@reduxjs/toolkit";
import * as blogAPI from "./blog-api"


const initialState = {
    loading:false, 
    error:null,
    blogsHeaders:[], 
    myblogs:[],
    addBlogId:"",
    blog:null,
}

const getblogHeaders = createAsyncThunk("blog/getblogHeaders",async(_,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
        try{const data = await blogAPI.getBlogHeaders(token);
            return data;
        }catch(e){
            return thunkAPI.rejectWithValue(e.message);
        }
})

const addBlog = createAsyncThunk("blog/addBlog", async(blog,thunkAPI)=>{
    const token = thunkAPI.getState().auth.token;
    try{const blogId = await blogAPI.addBlog(blog, token);
        thunkAPI.dispatch(getMyBlog()) ///tobe Implemented
        return blogId;
    }catch(e){
        return thunkAPI.rejectWithValue(e.message);
    }
})

const getMyBlog = createAsyncThunk("blog/getMyBlog", async(_,thunkAPI)=>{
    const token = thunkAPI.getState().auth.token;
    try{const data = await blogAPI.getMyBlog(token);
        return data;
    }catch(e){
        return thunkAPI.rejectWithValue(e.message);
    }
})

const getBlog = createAsyncThunk("blog/getBlog", async(blogId, thunkAPI)=>{
    const token = thunkAPI.getState().auth.token;
    try{const data = await blogAPI.getBlog(blogId, token);
        return data;
    }catch(e){
        return thunkAPI.rejectWithValue(e.message);
    }
})


const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getblogHeaders.pending,(states,action)=>{
            states.loading = true;
        });
        builder.addCase(getblogHeaders.fulfilled,(states,action)=>{
            states.loading = false;
            states.error = null;
            states.blogsHeaders=[];
            action.payload.forEach(blogH => {
                states.blogsHeaders.push(blogH)
            });
        });
        builder.addCase(getblogHeaders.rejected,(states, action)=>{
            states.error = action.payload;
            states.loading = false; 
        });
        //addingBloG
        builder.addCase(addBlog.pending,(states,action)=>{
            states.loading = true;
        });
        builder.addCase(addBlog.fulfilled,(states, action)=>{
            states.loading=false;
            states.error = null;
            states.addBlogId=action.payload;
        })
        builder.addCase(addBlog.rejected,(states, action)=>{
            states.error = action.payload;
            states.loading = false; 
        });
        //Adding MyBloGs 
        builder.addCase(getMyBlog.pending,(states,action)=>{
            states.loading = true;
        });
        builder.addCase(getMyBlog.fulfilled,(states,action)=>{
            states.loading = false;
            states.myblogs =action.payload;
        });
        builder.addCase(getMyBlog.rejected,(states, action)=>{
            states.error = action.payload;
            states.loading = false; 
        });
        //getAparticularBloGing
        builder.addCase(getBlog.pending,(states,action)=>{
            states.loading = true;
        });
        builder.addCase(getBlog.fulfilled,(states,action)=>{
            states.loading = false;
            states.blog =action.payload;
        });
        builder.addCase(getBlog.rejected,(states, action)=>{
            states.error = action.payload;
            states.loading = false; 
        });

    },
})

export const reducer = blogSlice.reducer;
export const actions = {
    ...blogSlice.actions,
    getblogHeaders, 
}

