import React from 'react'
import './songcard.css';
import AlbumImage from './albumImage';
import AlbumInfo from './albumInfo';

export default function SongCard({album}) {
  let url=null;
  if(album){
    if(album.images[0]){
      url=album.images[0].url;
    }
  }
  return (
    <div className='songcard-body flex'>
        <AlbumImage url={url}/>
        <AlbumInfo album={album}  />
    </div>
  )
}
