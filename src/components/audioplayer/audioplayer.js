import React,{useState,useEffect, useRef} from 'react'
import './audioplayer.css';
import ProgressCircle from './progresscircle';
import WaveAnimation from './waveanimation';
import Controls from './controls';


export default function Audioplayer({currenttrack,total,currentindex,setCurrentindex}) {
  if(!currenttrack.album)
    return;
  
  const [isPlaying,setIsPlaying]=useState(false);
  const [trackProgress,setTrackProgress]=useState(0);
  var audioSrc=total[currentindex]?total[currentindex].track.preview_url:"";
  const audioRef=useRef(new Audio(total[0]?total[0].track.preview_url:null));
  const intervalRef=useRef();
  const isReady=useRef(false);

  const {duration}=audioRef.current;
  const currentPercentage=duration?(trackProgress/duration)*100:0;
  // if(audioRef.current.src && isPlaying){
  //   audioRef.current.autoplay=true;
  // }
  console.log(audioRef);
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentindex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    var n=total.length;
    setCurrentindex((currentindex+1)%n);
  };

  const handlePrev = () => {
    var n=total.length;
    setCurrentindex((currentindex-1+n)%n);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists=[];
  currenttrack.album.artists.forEach(element => {
    artists.push(element.name);  
  });
  return (
    <div className='audioplayer-body flex'>
      <div className='player-left-body'>
        <ProgressCircle  percentage={currentPercentage} isPlaying="true" image={currenttrack.album.images[0].url} size={300} color="#C96850"/>
      </div>
      <div className='player-right-body flex'>
        <p className='song-title'>{currenttrack.name}</p>
        <p className='song-artist'>{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            // total={total}
          />
        </div>
      </div>
    </div>
  )
}
