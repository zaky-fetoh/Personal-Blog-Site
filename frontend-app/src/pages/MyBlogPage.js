import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../component/BlogCard";
import{actions as blogAct}from"../feature/blog/blog-slice";


export default function MyBlogPage(props){
    const [refr,setRefr] = useState(true)
    const dispatch = useDispatch()
    const blogState = useSelector(state=>state.blog.myblogs)
    useEffect(()=>{
        dispatch(blogAct.getMyBlog())
    },[refr])
    return <div>
        <button onClick={()=>setRefr(!refr)}> refresh </button>
        {blogState.map(e=>{
            return <BlogCard key={e.id} id={e.id}
            owner={e.owner} title={e.title} time={e.time}
            blog={e.blog}
        />})}
    </div>
}