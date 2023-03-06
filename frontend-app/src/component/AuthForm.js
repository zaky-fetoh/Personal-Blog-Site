import formCreator from "./form-creator";
import { useState } from "react"; 
// import { useDispatch, useSelector } from "react-redux"
// import {} from"../feature/auth/auth-slice";

export default function AuthForm(props){
    // InUp switch is true for SignIn form and false for SignUp form
    const [InUp, setInUp] = useState(true)
    // const auth = useSelector((state)=>state.auth)
    // const dispatch = useDispatch()

    const signUpHandler = (values, f)=>{};
    const SignUpForm = formCreator({
        userName:"", password:"", confirmPassword:"", 
    }, signUpHandler, "SignUp")

    const signInHandler = (values, f)=>{};
    const SignInForm = formCreator({
        userName:"", password:"",
    }, signInHandler,"SignIn");

    return <div>
        {(InUp && <SignInForm/>) || <SignUpForm/> }
        <p onClick={()=>setInUp(!InUp)}>{(InUp && "Sign Up" )|| "Sign In" }</p>
    </div>
    


}