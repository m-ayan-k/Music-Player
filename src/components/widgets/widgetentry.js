import React from 'react'
import './widgetentry.css'
export default function WidgetEntry({title,subtitle,image,key}) {

  return (
    <div className='entry-body flex'>
        <img src={image} alt={title} className="entry-image"></img>
        <div className="entry-right-body flex">
            <p className='entry-title clamp-line'>{title}</p>
            <p className="entry-subtitle">{subtitle}</p>
        </div>
    </div>
  )
}   
