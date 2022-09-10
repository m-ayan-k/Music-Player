import React from 'react'
import './albumInfo.css'
export default function AlbumInfo({album}) {
  if(!album) return;
  const artists = [];
  album.artists.forEach((element) => {
    artists.push(element.name);
  });
  return (
    <div className='albuminfo-card'>
      <div className='albumname-container'>
          <p className='marquee'>{album.name + " - " + artists.join(", ")}</p>
      </div>
      <div className='album-info'>
        <p className='marquee'>{`${album.name} is an ${album.album_type} by ${artists.join(
          ", "
        )} with ${album.total_tracks} track(s)`}</p>
      </div>
      <div className='album-release'>
        <p>Release Date: {album.release_date}</p>
      </div>
    </div>
  )
}
