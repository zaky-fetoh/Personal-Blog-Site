import formCreator from "./form-creator";


export default function AuthForm(props){

    

    const signUpHandler = (values, f)=>{};
    const SignUpForm = formCreator({
        userName:"", password:"", confirmPassword:"", 
    }, signUpHandler, "SignUp")

    const SignInHandler = (values, f)=>{};
    const SignInForm = formCreator({
        userName:"", password:"",
    }, signInHandler,"SignIn")

    return 


}