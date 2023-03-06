const UrlApi = "http://localhost:3000/"


export const login = async ({ userName, password }) => {
    const req = await fetch(UrlApi + "Login", {
        method: "POST",
        body: JSON.stringify({
            userName, password
        }),
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
    })
    const reqjson = await req.json()
    // console.log(reqjson)
    if (reqjson.ok) return reqjson;
    else throw new Error(reqjson.message);
}

export const signUp = async ({ userName, password }) => {
    const req = await fetch(UrlApi + "user", {
        method: "POST",
        body: JSON.stringify({
            userName, password
        }),
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
    })
    const reqjson = await req.json()
    if (reqjson.ok) return reqjson;
    else throw new Error(reqjson.message);
}



export const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if(!token) throw new Error("NoToken");
    const res = await fetch(UrlApi + "verify", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        }
    })
    const data = await res.json();
    if (data.ok) return true;
    else throw new Error(data.message)
}
