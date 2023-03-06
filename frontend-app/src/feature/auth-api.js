

const UrlApi = "http://localhost:3000/"


export const login = async({userName, password})=>{
    const req =await fetch(UrlApi+"Login",{
        method:"POST",
        body:JSON.stringify({
            userName, password
        }),
        headers:{
            "Content-Type":"application/json",
        },
    })
    const reqjson= await req.json()
    if(reqjson.ok) return reqjson;
    else throw new Error(reqjson.message);
}