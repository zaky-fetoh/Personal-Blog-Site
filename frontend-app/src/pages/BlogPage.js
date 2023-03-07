import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogCard from "../component/BlogCard";
import{actions as blogAct}from"../feature/blog/blog-slice"


export default function BlogPage(props){
    const id = useParams("blogId");
    const blog = useSelector(s=>s.blog);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(blogAct.getBlog(id))
    },[])
    return<>
    {(blog.loading && <h1>{"Loading..."}</h1>)|| <BlogCard
        key={blog.BlogCard.id} id={blog.BlogCard.id}
        owner={blog.BlogCard.owner} title={blog.BlogCard.title} 
        time={blog.BlogCard.time} blog={blog.BlogCard.blog}
    />}
    </>

}

