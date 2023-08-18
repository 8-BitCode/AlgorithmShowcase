export function BubbleSort(array) {
    var steps = [array.slice()]; // Initialize with a copy of the original array
  
    for (var i = 0; i < array.length; i++) {
      // Last i elements are already in place
      for (var j = 0; j < array.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (array[j] > array[j + 1]) {
          // If the condition is true
          // then swap them
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          steps.push(array.slice()); // Push a copy of the array into steps
        }
      }
    }
  
    return steps;
  }