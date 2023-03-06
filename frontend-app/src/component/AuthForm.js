import formCreator from "./form-creator";
import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux"
import {actions as authAct} from"../feature/auth/auth-slice";

import styles from "./AuthForm.module.css"

export default function AuthForm(props){
    // InUp switch is true for SignIn form and false for SignUp form
    const [InUp, setInUp] = useState(true)
    const auth = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    const signUpHandler = (values, f)=>{
        if(values.password !== values.confirmPassword)
            return f.errors.confirmPassword = "does not match";
        dispatch(authAct.signup(values))
    };
    const SignUpForm = formCreator({
        userName:"", password:"", confirmPassword:"", 
    }, signUpHandler, "SignUp")

    const signInHandler = (values, f)=>{
        dispatch(authAct.login(values))
    };
    const SignInForm = formCreator({
        userName:"", password:"",
    }, signInHandler,"SignIn");

    return <div className={styles.formContainer}>
        {(auth.loading && "Loding ...") || <>
        {(InUp && <SignInForm/>) || <SignUpForm/>}
        <a onClick={(e)=>{
            e.preventDefault()
            setInUp(!InUp)}}
        href="">{(InUp && "Sign Up" )|| "Sign In" }</a> 
        </>}
        <p style={{color:"red"}}
        >{!!auth.error && auth.error}</p>
    </div>
}