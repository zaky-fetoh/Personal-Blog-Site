import AuthPage from "./pages/AuthPage";
import {actions as authAct} from "./feature/auth/auth-slice"
import{ useDispatch, useSelector }from "react-redux"
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.css"
import BlogHeaderPage from "./pages/BlogHeaderPage";
import MyBlogPage from "./pages/MyBlogPage"
import NotFoundPage from "./pages/NotFoundPage";
import BlogPage from "./pages/BlogPage";

function Name(props){
  return <div className={styles.titling}>
      <p>ZAky</p>
  </div>
}

function NavHeader(){
  const dispatch = useDispatch();
  
  return <div className={styles.headerDiv}><nav>
      <Link to="/myBlogs">  Profile  </Link>|
      <a href="/" onClick={(e)=>{e.preventDefault();
        dispatch(authAct.logout());}}>
          LogOut  </a>
    </nav></div>
}


function Home(props){
  return <><header>
  <Name/> <NavHeader/> 
  </header> <Routes>
    <Route index element={<BlogHeaderPage/>} />
    <Route path="/myBlogs" element={<MyBlogPage/>}/>
    <Route path="/:blogId" element={<BlogPage/>}/>
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
