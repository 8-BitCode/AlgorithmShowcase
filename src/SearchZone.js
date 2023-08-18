import './SearchZone.css'

import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';
import { useState } from 'react';

import audioFile from './assets/jazz.mp3';
import Draggable from 'react-draggable';

import { Linear } from './Algorithms/Searching/Linear';
import { Binary } from './Algorithms/Searching/Binary';
import { Fibonacci } from './Algorithms/Searching/Fibonacci';

export const SearchZone = () => {
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

  const [array, setArray] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchIndex, setSearchIndex] = useState(-1);
  const [target, setTarget] = useState(0);
  const [checkedNumbers, setCheckedNumbers] = useState([]);
  const [sortSpeed, setSortSpeed] = useState(1000); 
  const [algorithm, setAlgorithm] = useState('Linear')

  const handleSortSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    setSortSpeed(newSpeed)
  };

  function ChooseAlgo (event){
    setAlgorithm(event.target.value)
  }

  const generateArray = () => {
    const newArray = [];
    const screenWidth = window.innerWidth;
  
    // Adjust the array length based on screen width
    const length = screenWidth <= 480 ? 10 : 17;
  
    setCheckedNumbers([]);
    while (newArray.length < length) {
      const randomValue = Math.floor(Math.random() * 100);
  
      // Check if the value is not already in the array
      if (!newArray.includes(randomValue)) {
        newArray.push(randomValue);
      }
    }
  
    newArray.sort((a, b) => a - b);
    setArray(newArray);
  
    // Set the target to a random number from the new array
    const randomIndex = Math.floor(Math.random() * newArray.length);
    setTarget(newArray[randomIndex]);
  };

  function search(){
    if(array[0] !== undefined){
      setisSorting(true)
    }
    clear()
    let searchResults;
  if (algorithm === 'Linear') {
    searchResults = Linear(array, target);
  } else if (algorithm === 'Binary') {
    searchResults = Binary(array, target);
  } else if (algorithm === 'Fibonacci') {
    searchResults = Fibonacci(array, target);
  } 
  // Update the state to reflect the search results
  setSearching(true);
  setSearchIndex(-1); // Reset the previous search index

  // Apply the 'dropped' class to the appropriate elements
  const droppedIndexes = searchResults.map((value) => array.indexOf(value));

  droppedIndexes.forEach((index, i) => {
    setTimeout(() => {
      setCheckedNumbers((prevCheckedNumbers) => [...prevCheckedNumbers, index]);
      if (i === droppedIndexes.length - 1) {
        // When all items are dropped, end the search animation
        setTimeout(() => {
          setSearching(false);
        }, 500);
        setisSorting(false) 
      }
    }, i* (1400 -sortSpeed));
     // Adjust the delay as needed
  });

  }
  function clear(){
    setCheckedNumbers([]);
  }

  const [isSorting, setisSorting] = useState(false)

  
  var greyed = 1
  if(isSorting){
    greyed = 0.5
  }

  return (
    <>
    <Draggable nodeRef={containerRef} cancel=".algocontainer, .cnp" > 
     
     <div className="containerS"  ref={containerRef}>
     <audio ref={audioRef} loop>
       <source src={audioFile}/>
     </audio>

     <div className='titleBarSE'>
       
       <div>C:\USERS\AMA\SearchingAlgorithmVisualiser.exe</div>
       <div className='bcS'>
       <button className='x' onClick={handleAudioPlay} onTouchStart={handleAudioPlay}>♪</button>
         <button className='m' onClick={() => navigate(-1)} onTouchStart={() => navigate(-1)}>-</button>
         <button className='x' onClick={() => navigate(-1)} onTouchStart={() => navigate(-1)}>X</button>
       </div>

     </div>

     <div className='algocontainer'>
       <div className="algo">
       {array.map((value, index) => (
  <div
    key={index}
    className={`bar ${
      index === searchIndex ? 'highlight' : ''
    } ${value === target ? 'greenTarget' : ''} ${
      checkedNumbers.includes(index) ? 'dropped' : ''
    }`}
    style={{
      height: `${
        checkedNumbers.includes(index) ? '0%' : 85 * (value / array.slice(-1)) + '%'
      }`,
    }}
  >
    {value}
  </div>
))}

       </div>
     </div>

     <div className="cnp">

      <div className='left' style={{opacity:`${greyed}`}}>
      <button className='ra' onClick={generateArray} onTouchStart={generateArray}>Generate Array</button>
      <div disabled={isSorting}>Algorithms:</div>
         <select onChange={ChooseAlgo} disabled={isSorting}>
          <option value='Linear'>Linear Search</option>
          <option value='Binary'>Binary Search</option>
          <option value='Fibonacci'>Fibonacci</option>
         </select>
      </div>

          <div className="middle" style={{opacity:`${greyed}`}}>
          <button onClick={clear} onTouchStart={clear} className='cl' disabled={isSorting}>clear</button>
            <div className='te' disabled={isSorting} >SortSpeed:</div>
            <input type='range' min='400' max='1000' 
            value={sortSpeed}
            onChange={handleSortSpeedChange} disabled={isSorting} />
          </div>

        <div className="rightSE" style={{opacity:`${greyed}`}}>
          <button onClick={search} onTouchStart={search} disabled={isSorting}>Search!</button>
        </div>
     
     </div>
     
     </div>
   </Draggable>
   
    </>
    
  )
}

export default SearchZone