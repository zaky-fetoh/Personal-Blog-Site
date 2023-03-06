import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogHeaderCard from "../component/BlogHeaderCard";
import{actions as blogAct}from"../feature/blog/blog-slice";


export default function BlogHeaderPage(props){
    const [refr,setRefr] = useState(true)
    const dispatch = useDispatch()
    const blogHeaderState = useSelector(state=>state.blog.blogsHeaders)
    useEffect(()=>{
        dispatch(blogAct.getblogHeaders())
    },[refr])
    return <div>
        <button onClick={()=>setRefr(!refr)}> refresh </button>
        {blogHeaderState.map(e=>{
            return <BlogHeaderCard key={e.id} id={e.id}
            owner={e.owner} title={e.title} time={e.time}
        />})}
    </div>
}