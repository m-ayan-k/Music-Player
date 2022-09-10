import React,{useState,useEffect}from 'react'
import  './sidebar.css'
import SidebarButton from './sidebarbutton'
import {MdFavorite } from 'react-icons/md';
import {FaPlay,FaGripfire } from 'react-icons/fa';
import {FaSignOutAlt } from 'react-icons/fa';
import {IoLibrary } from 'react-icons/io5';
import {MdSpaceDashboard } from 'react-icons/md';
import apiClient from '../../spotify';

export default function Sidebar() {
  const [image,setImage]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  ); 
  useEffect(()=>{
    apiClient.get("me").then((response)=>{
      setImage(response.data.images[0].url);
    })
  },[])
  return (
    <div className="sidebar-container">
        <img src={image} className='profile-img' alt='Profile'></img>
        <div>
            <SidebarButton tittle="Feed" to="/feed" icons={<MdSpaceDashboard />}/>
            <SidebarButton tittle="Trending" to="/trending" icons={<FaGripfire/>}/>
            <SidebarButton tittle="Player" to="/player" icons={<FaPlay/>}/>
            <SidebarButton tittle="Favorites" to="/favorites" icons={<MdFavorite/>}/>
            <SidebarButton tittle="Library" to="/" icons={<IoLibrary/>}/>
        </div>
        <SidebarButton tittle="Sign Out" to="" icons={<FaSignOutAlt/>}/>
        
    </div>
  )
}
