export function QuickSort(arr) {
    const steps = [];
  
    function quickSortHelper(arr, low, high) {
      if (low < high) {
        const pivotIndex = partition(arr, low, high);
        steps.push([...arr]); // Store current step
  
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      }
    }
  
    function partition(arr, low, high) {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          swap(arr, i, j);
        }
      }
  
      swap(arr, i + 1, high);
      return i + 1;
    }
  
    function swap(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  
    quickSortHelper(arr, 0, arr.length - 1);
    return steps;
  }