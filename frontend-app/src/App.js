import AuthPage from "./pages/AuthPage";
import {actions as authAct} from "./feature/auth/auth-slice"
import{ useDispatch, useSelector }from "react-redux"
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.css"

function Name(props){
  return <div>
      <p>ZAky</p>
  </div>
}

function NavHeader(){
  return <div className={styles.headerDiv}><nav>
      <Link to="/myBlogs">  Profile  </Link>|
      <Link to="/logout">  LogOut  </Link>
    </nav></div>
}

function LogOut(props){
  const dispatch = useDispatch();
  dispatch(authAct.logout());
  return <div>
    Loging Out...
  </div>
}

function Home(props){
  return <><header>
  <Name/> <NavHeader/>
  </header> <Routes>
    <Route index element={<BlogHeaderPage/>} />
    <Route path="/myBlogs" element={<MyBlogsPage/>}/>
    <Route path="/:blogId" element={<BlogPage/>}/>
    <Route path="/logout" element={<LogOut/>}/>
    <Route path="/*" element={<NotFoundPage/>}/>
  </Routes></>
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
