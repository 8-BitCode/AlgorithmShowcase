export function Fibonacci(arr, target) {
  const checkedNumbers = [];

  // Generate Fibonacci numbers up to or equal to the length of the array
  const fibNumbers = generateFibonacciNumbers(arr.length);

  let offset = -1;
  let fibIdx = fibNumbers.length - 1;

  while (fibIdx > 1) {
    const pos = Math.min(offset + fibNumbers[fibIdx - 2], arr.length - 1);

    checkedNumbers.push(arr[pos]);

    if (arr[pos] === target) {
      return checkedNumbers;
    } else if (arr[pos] < target) {
      fibIdx -= 1;
      offset = pos;
    } else {
      fibIdx -= 2;
    }
  }

  return checkedNumbers;
}

function generateFibonacciNumbers(length) {
  const fibNumbers = [0, 1];
  while (fibNumbers[fibNumbers.length - 1] < length) {
    fibNumbers.push(fibNumbers[fibNumbers.length - 1] + fibNumbers[fibNumbers.length - 2]);
  }
  return fibNumbers;
}