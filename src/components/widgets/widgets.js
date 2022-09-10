import React, { useState,useEffect } from 'react'
import apiClient from '../../spotify';
import WidgetCard from './widgetcard';
import './widgets.css';

export default function Widgets({artistId}) {
    if(!artistId) return
  const [similar,setSimilar]=useState([]);
  const [featured,setFeatured]=useState([]);
  const [newRelease,setNewRelease]=useState([]);

  useEffect(()=>{
    apiClient.get(`/artists/${artistId}/related-artists`)
    .then(res=>{
        if(res.data){
            const a=res.data.artists.slice(0,3);
            setSimilar(a);
        }
    })
    .catch(err=>console.log(err))

    apiClient.get("/browse/featured-playlists")
    .then(res=>{
        if(res.data){
            const a=res.data.playlists.items.slice(0,3);
            setFeatured(a);
        }
    })
    .catch(err=>console.log(err))

    apiClient.get("/browse/new-releases")
    .then(res=>{
        if(res.data){
            const a=res.data.albums.items.slice(0,3);
            setNewRelease(a);
        }
    })
    .catch(err=>console.log(err))
  },[artistId]);



  return (
    <div className='widgets-body flex'>
        <WidgetCard title="Similar Artists" similar={similar}/>
        <WidgetCard title="Made For You" featured={featured}/>
        <WidgetCard title="New Release" newRelease={newRelease}/>
    </div>
  )
}
