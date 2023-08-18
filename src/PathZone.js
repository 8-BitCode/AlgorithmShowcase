import { useNavigate } from "react-router-dom";

import React, { useRef, useState, useMemo} from 'react';
import audioFile from './assets/Chiptune.mp3';
import Draggable from 'react-draggable';
import './PathZone.css'
import { Dijkstra } from "./Algorithms/PathFinding/Dijkstra";
import { DepthFirst } from "./Algorithms/PathFinding/DepthFirst";

const PathZone = () => {

    const containerRef = useRef(null);
  const navigate = useNavigate();
  


  const audioRef = React.createRef();

  const handleAudioPlay = () => {
    const audioElement = audioRef.current;

    // Check if audio is paused or not started yet
    if (audioElement.paused) {
      audioElement.play().then(() => {
      }).catch((error) => {
        console.log('Audio play failed: ', error);
      });
    } else {
      audioElement.pause();
    }
  };
  
  const [isSorting, setisSorting] = useState(false)

  
  var greyed = 1
  if(isSorting){
    greyed = 0.5
  }


  const rows = 25; // Number of rows in the grid
  const cols = 20; // Number of columns in the grid

  const generateMaze = () => {
    // Create a grid of walls
    // Create a grid of walls
  const mazeGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ visited: false, wall: true }))
  );

  // Randomly choose a starting cell
  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * cols);

  mazeGrid[startRow][startCol].visited = true;
  mazeGrid[startRow][startCol].wall = false;

  // List of cells to visit
  let frontier = [{ row: startRow, col: startCol }];

    while (frontier.length) {
      const randomIndex = Math.floor(Math.random() * frontier.length);
      const { row, col } = frontier[randomIndex];
      const neighbors = [];

      // Find unvisited neighbors
      if (row > 1) neighbors.push({ row: row - 2, col });
      if (row < rows - 2) neighbors.push({ row: row + 2, col });
      if (col > 1) neighbors.push({ row, col: col - 2 });
      if (col < cols - 2) neighbors.push({ row, col: col + 2 });

      const unvisitedNeighbors = neighbors.filter(
        ({ row, col }) => !mazeGrid[row][col].visited
      );
      

      if (unvisitedNeighbors.length) {
        const randomNeighbor = unvisitedNeighbors[
          Math.floor(Math.random() * unvisitedNeighbors.length)
        ];
        const { row: nRow, col: nCol } = randomNeighbor;
  
        mazeGrid[nRow][nCol].visited = true;
        mazeGrid[nRow][nCol].wall = false;
        mazeGrid[row + (nRow - row) / 2][col + (nCol - col) / 2].wall = false;
  
        frontier.push({ row: nRow, col: nCol });
      } else {
        frontier.splice(randomIndex, 1);
      }
    }
    

    return mazeGrid;
  };
  const generateNewMaze = () => {
    clearBoard();

    const mazeGrid = generateMaze();
    // Ensure that the green and red cells are not placed on walls
    let greenRow, greenCol, redRow, redCol;
    do {
      greenRow = Math.floor(Math.random() * rows);
      greenCol = Math.floor(Math.random() * cols);
    } while (mazeGrid[greenRow][greenCol].wall);

    do {
      redRow = Math.floor(Math.random() * rows);
      redCol = Math.floor(Math.random() * cols);
    } while (mazeGrid[redRow][redCol].wall || (greenRow === redRow && greenCol === redCol));

    mazeGrid[greenRow][greenCol].greenCell = true;
    mazeGrid[redRow][redCol].redCell = true;

    setMazeGrid(mazeGrid);
  };
  const [mazeGrid, setMazeGrid] = useState(null);
  
  const renderMaze = useMemo(() => {
    if (!mazeGrid) return null;

    return mazeGrid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`maze-cell ${cell.wall ? `wall ${rowIndex}-${colIndex}` : `${rowIndex}-${colIndex}`} ${cell.greenCell ? 'green-cell' : ''} ${cell.redCell ? 'red-cell' : ''}`}
          />
        ))}
      </div>
    ));
  }, [mazeGrid]);


  
  function clearBoard() {
    const mazeCells = document.getElementsByClassName('maze-cell');
  
    // Remove checked-cell and purple-cell classes from all cells
    Array.from(mazeCells).forEach(cell => {
      cell.classList.remove('checked-cell', 'purple-cell');
    });
  }



const getNonWallCellsAsGraph = () => {
  const mazeCells = document.getElementsByClassName('maze-cell');
  const nonWallCells = {};

  for (const cell of mazeCells) {
    const classNames = cell.className.split(' ');
    if (!classNames.includes('wall')) {
      const cellInfo = classNames.filter(className => className !== 'maze-cell' && className !== '' && className !== 'green-cell' && className !== 'red-cell');
      const cellId = cellInfo.join('-'); // Create a unique identifier for the cell
      nonWallCells[cellId] = [];
    }
  }

  // Assuming your maze layout allows cells to be connected horizontally and vertically
  for (const cellId in nonWallCells) {
    const [rowIndex, colIndex] = cellId.split('-').map(Number);
    const neighbors = [];

    // Check neighboring cells to establish connections
    if (nonWallCells[`${rowIndex - 1}-${colIndex}`]) neighbors.push([`${rowIndex - 1}-${colIndex}`, 1]); // Assuming distance between adjacent cells is 1
    if (nonWallCells[`${rowIndex + 1}-${colIndex}`]) neighbors.push([`${rowIndex + 1}-${colIndex}`, 1]);
    if (nonWallCells[`${rowIndex}-${colIndex - 1}`]) neighbors.push([`${rowIndex}-${colIndex - 1}`, 1]);
    if (nonWallCells[`${rowIndex}-${colIndex + 1}`]) neighbors.push([`${rowIndex}-${colIndex + 1}`, 1]);

    nonWallCells[cellId] = neighbors;
  }

  // Create the edge list in the desired format
  const edgeList = [];
  for (const source in nonWallCells) {
    for (const [target, weight] of nonWallCells[source]) {
      edgeList.push([source, target, weight]);
    }
  }

  return edgeList;
};

const findCellPosition = (mazeCells, targetClass) => {
  for (const cell of mazeCells) {
    if (cell.classList.contains(targetClass)) {
      const classNames = cell.className.split(' ');
      const cellInfo = classNames.find(className => className !== 'maze-cell' && className !== '' && className !== 'green-cell' && className !== 'red-cell');
      return cellInfo;
    }
  }
  return null;
};

const [algorithm, setAlgorithm] = useState('Dijkstra');
function ChooseAlgo (event){
  setAlgorithm(event.target.value)
}
function sort(){
  clearBoard();
  const mazeCells = document.getElementsByClassName('maze-cell');

  const greenPosition = findCellPosition(mazeCells, 'green-cell');
  const redPosition = findCellPosition(mazeCells, 'red-cell');
  const graph = getNonWallCellsAsGraph();
  const source = greenPosition;
  const target = redPosition;

  const algorithmFunctions = {
    Dijkstra: Dijkstra,
    DepthFirst: DepthFirst,
    // Add more algorithms here if needed
  };

  const selectedAlgorithmFunction = algorithmFunctions[algorithm];
  
  // Call the selected algorithm function
  const [shortestPath, checkedCells] = selectedAlgorithmFunction(graph, source, target);
  console.log(shortestPath)

  if (shortestPath[0] !==null){
    setisSorting(true)
  }

  const delay = 50; // Delay in milliseconds between cell appearances

  // Visualize checked cells
  checkedCells.forEach((checkedCell, index) => {
    if (checkedCell === greenPosition || checkedCell === redPosition) {
      return; // Skip adding/removing class for green and red cells
    }

    setTimeout(() => {
      const selector = `.maze-cell[class*="${checkedCell}"]`;
      const cell = document.querySelector(selector);
      if (cell) {
        cell.classList.add('checked-cell');
      }
    }, index * delay); // Apply delay for each cell
  });

  // Visualize shortest path in purple one by one
  setTimeout(() => {
    shortestPath.forEach((pathCell, index) => {
      if (pathCell !== greenPosition && pathCell !== redPosition) {
        setTimeout(() => {
          const selector = `.maze-cell[class*="${pathCell}"]`;
          const cell = document.querySelector(selector);
          if (cell) {
            cell.classList.add('purple-cell');
          }
          setisSorting(false)
        }, (index + checkedCells.length) * delay);
      }
    });
  }, checkedCells.length * 10);
  
}
  return (
    <Draggable nodeRef={containerRef} cancel=".algocontainer, .cnp" > 
    

     <div className="containerS"  ref={containerRef}  >
      
      <audio ref={audioRef} loop>
       <source src={audioFile}/>
     </audio>
     <div className='titleBarP'>
       
       <div>C:\USERS\AMA\PathFindingVisualiser.exe</div>
       <div className='bcP'>
       <button className='x' onClick={handleAudioPlay} onTouchStart={handleAudioPlay}>♪</button>
         <button className='m' onClick={() => navigate(-1)} onTouchStart={() => navigate(-1)}>-</button>
         <button className='x' onClick={() => navigate(-1)} onTouchStart={() => navigate(-1)}>X</button>
       </div>

     </div>
  
     
     <div className='algocontainer'>
       <div className="algo">
       {renderMaze}
       </div>
     </div>

     <div className="cnp" >

      <div className='leftP' style={{opacity:`${greyed}`}}>
      <div disabled={isSorting}>Algorithms:</div>
         <select onChange={ChooseAlgo} disabled={isSorting}>
           <option value='Dijkstra'>Dijkstra</option>
           <option value='DepthFirst'>Depth First</option>
           
         </select>
      </div>
       

          <div className="middle" style={{opacity:`${greyed}`}}>

          <button className='raP' onClick={generateNewMaze} onTouchStart={generateNewMaze} disabled={isSorting}>Generate Maze</button>


            <button className='raP' onClick={clearBoard} onTouchStart={clearBoard} disabled={isSorting}>Clear Board</button>
            
          </div>

        <div className="right" style={{opacity:`${greyed}`}}>
          <button onClick={sort} onTouchStart={sort} disabled={isSorting}>Find Path!</button>
        </div>     

     </div>
  
      </div>

     

   </Draggable>

  )
}

export default PathZone