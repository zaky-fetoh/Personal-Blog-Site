import AuthPage from "./pages/AuthPage";
import {actions as authAct} from "./feature/auth/auth-slice"
import{ useDispatch, useSelector }from "react-redux"
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css"

function Home(props){
  return <h1>
    hello
  </h1>
}



function App() {
  const auth = useSelector(state=>state.auth);
  const dispatch =useDispatch();
  useEffect(()=>{
    dispatch(authAct.verifyToken())
  },[])

  return <div>
    <Routes>
    <Route path="/*" element={(auth.logedIn && <Home/> )||<AuthPage/>}/>
    </Routes>
  </div>
}

export default App;
