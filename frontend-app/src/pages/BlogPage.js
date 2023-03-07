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
    {(blog.loading && <h1>{"Loading..."}</h1>)|| (!!blog.blogCar&&<BlogCard
        key={blog.blogCar._id} id={blog.blogCar._id}
        owner={blog.blogCar.owner} title={blog.blogCar.title} 
        time={blog.blogCar.time} blog={blog.blogCar.blog}
    />)||<h1>No blogs Exist</h1> }
    </> 
}

