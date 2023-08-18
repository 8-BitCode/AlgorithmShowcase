export function Binary(arr, target) {
    const checkedNumbers = [];
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      checkedNumbers.push(arr[mid]);
  
      if (arr[mid] === target) {
        break; // Stop the loop when target is found
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return checkedNumbers;
  }