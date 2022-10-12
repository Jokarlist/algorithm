/**
 * 冒泡排序
 * 时间复杂度 O(n^2)
 * 额外空间复杂度 O(1)
 * @param {number[]} arr 待排序的数组
 */
const bubbleSort = function (arr) {
  if (!arr || arr.length < 2) return;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
};

/**
 * 选择排序
 * 时间复杂度 O(n^2)
 * 额外空间复杂度 O(1)
 * @param {number[]} arr 待排序的数组
 */
const selectionSort = function (arr) {
  if (!arr || arr.length < 2) return;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    swap(arr, minIndex, i);
  }

  return arr;
};

/**
 * 插入排序
 * 时间复杂度 O(n^2)
 * 额外空间复杂度 O(1)
 * @param {number[]} arr 待排序的数组
 */
const insertionSort = function (arr) {
  if (!arr || arr.length < 2) return;
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1);
    }
  }

  return arr;
};

module.exports = {
  bubbleSort,
  selectionSort,
  insertionSort,
};

const { comparator, swap } = require("./utils");
comparator(insertionSort);
