export function MergeSort(arr) {
  const steps = [];

  function mergeSort(arr, l, r) {
    if (l >= r) {
      return;
    }

    const mid = Math.floor((l + r) / 2);
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
  }

  function merge(arr, l, mid, r) {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);

    let i = 0,
      j = 0,
      k = l;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      j++;
      k++;
    }

    steps.push([...arr]);
  }

  mergeSort(arr, 0, arr.length - 1);
  return steps;
}