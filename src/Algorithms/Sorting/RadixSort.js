export function RadixSort(arr) {
    const steps = [];
  
    function getMax(arr) {
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    }
  
    function countingSort(arr, exp) {
      const n = arr.length;
      const output = new Array(n);
      const count = new Array(10).fill(0);
  
      for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
      }
  
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
  
      for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
      }
  
      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        steps.push([...arr]); // Store the current state of the array
      }
    }
  
    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp);
    }
  
    return steps;
  }