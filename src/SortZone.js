import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';
import { useState } from 'react';
import { BubbleSort } from "./Algorithms/Sorting/BubbleSort";
import { QuickSort } from './Algorithms/Sorting/QuickSort'
import { MergeSort } from "./Algorithms/Sorting/MergeSort";
import { HeapSort } from "./Algorithms/Sorting/HeapSort";
import { RadixSort } from "./Algorithms/Sorting/RadixSort";
import { CocktailShakerSort } from "./Algorithms/Sorting/CocktailShakerSort";

import './SortZone.css'
import audioFile from './assets/Goodnightmare.mp3';
import Draggable from 'react-draggable';

export const SortZone = () => {
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
  const [arrayLength, setArrayLength] = useState(20); 
  const [sortSpeed, setSortSpeed] = useState(500); 
  const [arr, setarr] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  //eslint-disable-next-line no-unused-vars
  const [isSorting, setIsSorting] = useState(false);
  //eslint-disable-next-line no-unused-vars
  const [sortstatus, setsortstatus] = useState(false);
  var greyed = 1
  
  if(isSorting){
    greyed = 0.5
  }

  const handleSortSpeedChange = (event) => {
    setSortSpeed(parseInt(event.target.value, 10));
  };
  const generateRandomArray = () => {
      setsortstatus(false)
    const newArray = [];
    for (let i = 0; i < arrayLength; i++) {
      // Generate random numbers between 5 and 500 (you can adjust the range as needed)
      const randomNumber = Math.floor(Math.random() * 496) + 5;
      newArray.push(randomNumber);
    }
    setarr(newArray);
  };
  
  function changeLength(event){
      setArrayLength(parseInt(event.target.value))
    generateRandomArray()
    
  }
  
    
  const largestNum = Math.max(...arr);

  function ChooseAlgo (event){
    setsortstatus(false)
    setAlgorithm(event.target.value)
  }
  var backgroundColour = 'grey'
  if (sortstatus){
    backgroundColour = 'green'
  }
  
  function sort() {
    let sortingFunction = null;
  
    if (algorithm === 'Bubble Sort') {
      sortingFunction = BubbleSort;
    } else if (algorithm === 'Quick Sort') {
      sortingFunction = QuickSort;
    } else if (algorithm === 'Merge Sort') {
      sortingFunction = MergeSort;
    }else if (algorithm === 'Heap Sort') {
      sortingFunction = HeapSort;
    }else if (algorithm === 'Radix Sort') {
      sortingFunction = RadixSort;
    }else if (algorithm === 'Cocktail Shaker Sort') {
      sortingFunction = CocktailShakerSort;
    }
    
  
    if (sortingFunction) {
      setIsSorting(true);
      const sortedArray = sortingFunction([...arr]);
      let i = 0;
  
      const intervalId = setInterval(() => {
        if (i < sortedArray.length) {
          setarr(sortedArray[i].slice()); // Update the array visualization
          i++;
        } else {
          clearInterval(intervalId);
          setIsSorting(false);
          setsortstatus(true);
        }
      }, -sortSpeed + 200.0001);
    }
  }
  

  return (
    
    <Draggable nodeRef={containerRef} cancel=".algocontainer, .cnp" > 
    

     <div className="containerS"  ref={containerRef}  >
      
      <audio ref={audioRef} loop>
       <source src={audioFile}/>
     </audio>
     <div className='titleBarS'>
       
       <div>C:\USERS\AMA\SortingAlgorithmVisualiser.exe</div>
       <div className='bcS'>
       <button className='x' onClick={handleAudioPlay} onTouchStart={handleAudioPlay}>♪</button>
         <button className='m' onClick={() => navigate(-1)} onTouchStart={() => navigate(-1)}>-</button>
         <button className='x' onClick={() => navigate(-1)} onTouchStart={() => navigate(-1)}>X</button>
       </div>

     </div>
  
     
     <div className='algocontainer'>
       <div className="algo">
       {arr.map((value, index) => (
        <div className="array-bar"key={index}style={{ 
          height:`${92*(value/largestNum)}%`,
          background: `${backgroundColour}`,
          width:`${500/(arr.length)}px`,
          marginLeft:`${10/(arrayLength)}%`,
          marginRight:`${30/(arrayLength)}%`,
          
          }}></div>))}
       </div>
     </div>
     <div className="cnp" >

      <div className='left' style={{opacity:`${greyed}`}} >
      <button className='ra' onClick={generateRandomArray} disabled={isSorting}>Generate Array</button>
      <div>Algorithms:</div>
         <select onChange={ChooseAlgo} disabled={isSorting}>
           <option value='Bubble Sort'>Bubble Sort</option>
           <option value='Quick Sort'>Quick Sort</option>
           <option value='Merge Sort'>Merge Sort</option>
           <option value='Heap Sort'>Heap Sort</option>
           <option value='Radix Sort'>Radix Sort</option>
           <option value='Cocktail Shaker Sort'>Cocktail Sort</option>
         </select>
      </div>
       

          <div className="middle" style={{opacity:`${greyed}`}}>
          <div className='te'>Array Length:</div>

            <input type='range' min='20' max='150' 
            value={arrayLength}
            onChange={changeLength}  
            disabled={isSorting}
            className='slider'/>

            <div className='te'>Sort Speed:</div>

            <input type='range' min='1' max='200'   
            value={sortSpeed}
            onChange={handleSortSpeedChange}
            disabled={isSorting}
            className='slider'/>
            
          </div>

        <div className="rightSO" style={{opacity:`${greyed}`}}>
          <button onClick={sort} disabled={isSorting}>SORT!</button>
        </div>     

     </div>
  
      </div>

     

   </Draggable>

  )
}

export default SortZone;
