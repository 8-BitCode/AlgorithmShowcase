export function CocktailShakerSort(arr) {
    const steps = [];
  
    function swap(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  
    let start = 0;
    let end = arr.length - 1;
    let swapped;
  
    do {
      swapped = false;
  
      for (let i = start; i < end; i++) {
        if (arr[i] > arr[i + 1]) {
          swap(arr, i, i + 1);
          steps.push([...arr]); // Store the current state of the array
          swapped = true;
        }
      }
  
      if (!swapped) break;
  
      swapped = false;
      end--;
  
      for (let i = end - 1; i >= start; i--) {
        if (arr[i] > arr[i + 1]) {
          swap(arr, i, i + 1);
          steps.push([...arr]); // Store the current state of the array
          swapped = true;
        }
      }
  
      start++;
    } while (swapped);
  
    return steps;
  }