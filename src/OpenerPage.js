import { useRef } from 'react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Draggable from 'react-draggable';


import './OpenerPage.css'
import audioFile from './assets/Planeteer-Reaction.MP3';
import welcome from './assets/cooltext440150621142019.gif'
import computer from './assets/computer.gif'
import skull from './assets/skull.gif'
import rubix from './assets/rubix.gif'
import baby from './assets/dancing-baby.gif'
import math from './assets/math.gif'
import fire from './assets/fire.gif'
import at from './assets/at.gif'
import business from './assets/ani.businessman2.gif'

function OpenerPage() {
      
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const handleAudioPlay = () => {
    const audioElement = audioRef.current;

    // Check if audio is paused or not started yet
    if (audioElement.paused) {
      audioElement.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio play failed: ', error);
      });
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };


  return (
   
      <Draggable nodeRef={containerRef} cancel='.welcome-text,.image-container,.marquee,.buttons-container'>
        

      <div className='container' ref={containerRef}>
        
      <audio ref={audioRef} loop>
        <source src={audioFile}/>
      </audio>
        <div className='titleBar'>
        
        <div>C:\USERS\AMA\</div>
        <div className='bc'>
        <button className='x'  onClick={handleAudioPlay} onTouchStart={handleAudioPlay}>♪</button>
        </div>
      </div>
      

      <div className="welcome-text">Welcome to my</div>
      <div className="image-container">
        <img src={welcome} alt="UNDER CONSTRUCTION" className="image" />
      </div>
      
          <div className="marquee">
      <div className="marquee-content"> 
        <div className="marquee-item">
        <img src={baby} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={computer} alt=""></img>
        </div>
        
        <div className="marquee-item">
        <img src={rubix} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={skull} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={math} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={fire} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={at} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={business} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={baby} alt=""></img>
        </div>
        
        <div className="marquee-item">
        <img src={computer} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={rubix} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={skull} alt=""></img>
        </div>
        
        <div className="marquee-item">
        <img src={math} alt=""></img>
        </div>
        
        <div className="marquee-item">
        <img src={fire} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={at} alt=""></img>
        </div>
        
        <div className="marquee-item">
          <img src={business} alt=""></img>
        </div>
      </div>
    </div>

      
    
      <div className="buttons-container">
        <button className="big-button" onClick={() => navigate("/PathZone")}  onTouchStart={() => navigate("/PathZone")}>Enter The Path Finding Zone</button>
        <button className="big-button" onClick={() => navigate("/SortZone")}  onTouchStart={() => navigate("/SortZone")}>Enter The Sorting Zone</button>
        <button className="big-button" onClick={() => navigate("/SearchZone")}  onTouchStart={() => navigate("/SearchZone")}>Enter The Searching Zone</button>
      </div>
      
      
    </div>

    </Draggable>
    
  );
}

export default OpenerPage;

