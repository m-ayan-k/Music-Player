import React,{useState,useEffect} from 'react'
import APIKit from "../../spotify";
import { IconContext } from 'react-icons';
import {AiFillPlayCircle} from 'react-icons/ai';
import './library.css';
import { useNavigate } from 'react-router-dom';



 

export default function Library() {
  const[playlists,setPlaylists]= useState(null);

  useEffect(()=>{
    APIKit.get('me/playlists').then(function (response) {

      setPlaylists(response.data.items);
    });
  },[]);
  
  const navigate=useNavigate();
  const playPlaylist=(id)=>{
    navigate("/player",{state:{id:id}});
  };
  return (
    <div className="screen_container">
      <div className='library-body'>
        {playlists?playlists.map((playlist)=>(
        <div key={playlist.id} className='playlist-card' onClick={()=>playPlaylist(playlist.id)}>

          <img src={playlist.images[0].url} className='playlist-image' alt='playlist-art'/>
          <p className="playlist-title">{playlist.name}</p>
          <p className='playlist-subtitle'>{playlist.tracks.total} Songs</p>

          <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
          </div>

        </div>)):null}
      </div>
    </div>
  );
}
