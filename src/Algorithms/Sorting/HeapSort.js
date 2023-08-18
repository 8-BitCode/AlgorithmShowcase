export function HeapSort(arr) {
    const steps = [];
    
    function swap(i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  
    function heapify(n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
  
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
  
      if (largest !== i) {
        steps.push([...arr]); // Store the current state of the array
        swap(i, largest);
        heapify(n, largest);
      }
    }
  
    function buildHeap() {
      const n = arr.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }
    }
  
    function sort() {
      const n = arr.length;
      for (let i = n - 1; i > 0; i--) {
        swap(0, i);
        heapify(i, 0);
        steps.push([...arr]); // Store the current state of the array
      }
    }
  
    buildHeap();
    sort();
  
    return steps;
  }