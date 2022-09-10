import React from 'react'
import './progresscircle.css'

const Circle=({ color,percentage,size,strokeWidth})=>{
  const radius=(size/2)-10;
  const circ=(2*Math.PI*radius)-20;
  const strokepercentage=((100-Math.round(percentage))*circ)/100;
  return(
    <circle
    r={radius}
    cx="50%"
    cy="50%"
    fill="transparent"
    stroke={strokepercentage !== circ?color:""}
    strokeWidth={strokeWidth}
    strokeDasharray={circ}
    strokeDashoffset={percentage?strokepercentage:0}
    strokeLinecap="round"></circle>
  );
};
export default function ProgressCircle({percentage ,isPlaying,size,color,image}) {
  return (
    <div className='progress-circle flex'>
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth={"0.4rem"} color="#384F73" size={size}/>
          <Circle strokeWidth={"0.6rem"} color={color} size={size} percentage={percentage}/>
        </g>
        <defs>
          <clipPath id="my-circle">
            <circle cx="50%" cy="50%" r={size/2 - 30} fill="white"></circle>
          </clipPath>
          <clipPath id="myinnercircle">
            <circle cx="50%" cy="50%" r={size/2 - 80} fill="white"></circle>
          </clipPath>
        </defs>
        <image className={isPlaying?"active":""} x={30} y={30} width={2*(size/2 - 30)} height={2*(size/2 - 30)}
        href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
        clipPath="url(#my-circle)" />
        <image className={isPlaying?"active":""} x={80} y={80} width={2*(size/2 - 80)} height={2*(size/2 -80)}
        href={image}
        clipPath="url(#myinnercircle)" />
      </svg>
    </div>
  )
}
