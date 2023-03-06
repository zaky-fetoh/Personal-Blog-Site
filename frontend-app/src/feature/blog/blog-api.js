const BlogUrl  = "http://localhost:300/blog/";


export const getBlogHeaders = async(token)=>{
    const req = await fetch(BlogUrl,{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        }
    });
    const jsonData = await req.json(); 
    if(jsonData.ok) return jsonData.data;
    else throw new Error(jsonData.message);
}

export const addBlog = async({title,blog}, token)=>{
    const req = await fetch(BlogUrl,{
        method:"POST", 
        headers:{
            "Authorization":`Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
        body:{title, blog}
    })
    const jsondata= await req.json();
    if(jsondata.ok) return jsondata.blogId; 
    else throw new Error(jsondata.message);
}


export const getMyBlog = async(token)=>{
    const req = await fetch(BlogUrl+"my-blog",{
        method:"GET", 
        headers:{
            "Authorization":`Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
    })
    const jsondata= await req.json();
    if(jsondata.ok) return jsondata.data; 
    else throw new Error(jsondata.message);
}

export const getBlog = async(blogId, token)=>{
    const req = await fetch(`${BlogUrl}${blogId}`,{
        method:"GET", 
        headers:{
            "Authorization":`Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
    })
    const jsondata= await req.json();
    if(jsondata.ok) return jsondata.data; 
    else throw new Error(jsondata.message);
}

export const deleteBlog = async(blogId, token)=>{
    const req = await fetch(`${BlogUrl}${blogId}`,{
        method:"DELETE", 
        headers:{
            "Authorization":`Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
    })
    const jsondata= await req.json();
    if(jsondata.ok) return jsondata.message; 
    else throw new Error(jsondata.message);
}