import React from 'react'
import './queue.css'
export default function Queue({tracks,setCurrentindex}) {
  if(!tracks) return;
  return (
    <div className='queue-container flex'>
      <div className='queue flex'>
        <p className='upnext'>Up Next</p>
        <div className='queue-list'>
          {tracks.map((track,idx)=>(
            <div key={idx} className='queue-item flex' onClick={()=>setCurrentindex(idx)}>
              <p className='track-name'>{track.track.name}</p>
              <p>0:30</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
