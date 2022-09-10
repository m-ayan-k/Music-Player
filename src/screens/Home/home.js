import React,{useState,useEffect}from 'react';
import { Routes ,Route ,BrowserRouter as Router} from 'react-router-dom';
import Favorites from '../Favorites/favorites';
import Feed from '../Feed/feed';
import Player from '../Player/player';
import Trending from '../Trending/trending';
import Library from '../Library/library';


import './home.css';
import Sidebar from '../../components/sidebar/sidebar';
import Login from '../auth/login';
import { setClientToken } from '../../spotify';

export default function Home() {
  const [token,setToken]=useState("");
  useEffect(()=>{
    const token=window.localStorage.getItem('token');
    const hash=window.location.hash;
    window.location.hash="";
    if(!token && hash){
      const _token=hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token",_token);
      setToken(_token);
      setClientToken(_token);
    }
    else{
      setToken(token);  
      setClientToken(token);
    }
    
  },[]);
  return (
    !token?(<Login/>):(
      <Router>
      <div className="main-body">
        <Sidebar/>
        <Routes>
            <Route path="/" element={<Library/>}/>
            <Route path="/Feed" element={<Feed/>}/>
            <Route path="/Trending" element={<Trending/>}/>
            <Route path="/Player" element={<Player/>}/>
            <Route path="/Favorites" element={<Favorites/>}/>
        </Routes>
      </div>
    </Router>
    )
  )
}
