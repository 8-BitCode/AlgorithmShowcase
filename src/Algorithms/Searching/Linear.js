export function Linear(arr, target) {
    const checkedNumbers = [];
    for (let i = 0; i < arr.length; i++) {
      checkedNumbers.push(arr[i]);
      if (arr[i] === target) {
        break; // Stop the loop when target is found
      }
    }
    return checkedNumbers.slice(0, checkedNumbers.length ); 
  }