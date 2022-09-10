import React from 'react'
import './albumImage.css';
export default function AlbumImage({url}) {
  return (
      <div className='albumimage'>
        <img src={url} alt='album-art' className='albumimage-art'/>
        <div className='albumimage-shadow'>
          <img src={url} alt='shadow' className='albumimage-shadow'/>
        </div>
      </div>
      
  )
}
