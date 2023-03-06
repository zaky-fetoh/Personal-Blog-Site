import AuthForm from "../component/AuthForm"
import styles from  "./AuthPage.module.css"

function Name(props){
    return <div>
        <p>ZAky</p>
    </div>
}


export default function AuthPage (props){

    return <>
    <header><Name/></header>
    <div className={styles.AuthCont}>
        <AuthForm/>
    </div></>
}
