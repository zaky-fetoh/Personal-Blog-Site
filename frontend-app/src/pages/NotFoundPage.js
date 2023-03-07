import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function NotFoundPage(props){
    const [cnt,setCnt] = useState(5)
    const navg = useNavigate();
    useEffect(()=>{

        if(cnt === 0){
            navg("/");
            return;
        }
        setTimeout(()=>{
            setCnt(cnt-1)
        },1000)
    },[cnt])
    return <><h1>NotFound </h1>
    <h5>{`Redirecting to the home page in ${cnt} sec`}</h5>
    </>
}
