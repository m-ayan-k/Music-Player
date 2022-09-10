import React,{useState,useEffect} from 'react'
import './player.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify';
import SongCard from '../../components/songcard/songcard'; 
import Queue from '../../components/queue/queue';
import Audioplayer from '../../components/audioplayer/audioplayer';
import Widgets from '../../components/widgets/widgets';


export default function Player() {
  const location=useLocation();
  const [tracks, setTracks]=useState([]);
  const[currenttrack,setCurrenttrack]=useState({});
  const[currentindex,setCurrentindex]=useState(0);


  useEffect(() => {
    if(location.state!==null){
      apiClient.get("playlists/"+location.state.id+"/tracks")
      .then((res)=>{
        setTracks(res.data.items);
        setCurrenttrack(res.data.items[0].track);
      });
    } 
  },[location.state]);
  useEffect(()=>{
      setCurrenttrack(tracks[currentindex]?tracks[currentindex].track:currenttrack);
  },[currentindex,tracks]);
  return (
    <div className="screen_container flex">
      <div className='left-player-body'>
        <Audioplayer currenttrack={currenttrack}
          total={tracks}
          currentindex={currentindex}
          setCurrentindex={setCurrentindex}/>
          <Widgets artistId={currenttrack.album?currenttrack.album.artists[0].id:null}/>
      </div>
      <div className='right-player-body'>
        <SongCard album={currenttrack.album}/>
        <Queue tracks={tracks} setCurrentindex={setCurrentindex}/>
      </div>
    </div>
  )
}
