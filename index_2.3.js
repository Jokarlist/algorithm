/**
 * 堆排序
 *
 * 1、先让整个数组都变成大根堆结构，建立堆的过程：
 *  1)从上到下的方法，时间复杂度为 O(nlogn)
 *  2)从下到上的方法，时间复杂度为 O(n)
 * 2、把堆的最大值和堆末尾的值交换，然后减少堆的大小之后，再去调整堆，一直周而复始，时间复杂度为 O(nlogn)
 * 3、堆的大小减小成 0 之后，排序完成
 */

/**
 * 堆排序
 * 时间复杂度 O(nlogn)
 * 空间复杂度 O(1)
 * @param {number[]} arr 待排序数组
 */
function heapSort(arr) {
  if (!arr || arr.length < 2) {
    return arr;
  }

  // // O(nlogn)
  // for (let i = 0; i < arr.length; i++) { // O(n)
  //   heapInsert(arr, i); // O(logn)
  // }

  // O(n)
  for (let i = arr.length - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }

  let heapSize = arr.length;
  swap(arr, 0, --heapSize);
  while (heapSize > 0) { // O(n)
    heapify(arr, 0, heapSize); // O(logn)
    swap(arr, 0, --heapSize); // O(1)
  }

  return arr;
}

// 某个数现在处于 i 位置，往上继续移动
function heapInsert(arr, i) {
  while (arr[i] > arr[Math.floor(Math.abs((i - 1) / 2))]) {
    swap(arr, i, Math.floor(Math.abs((i - 1) / 2)));
    i = Math.floor(Math.abs((i - 1) / 2));
  }
}

// 某个数现在处于 i 位置，能否往下移动
function heapify(arr, i, heapSize) {
  // 左孩子的索引
  let left = 2 * i + 1;
  while (left < heapSize) { // 下方还有左孩子的时候
    // 两个孩子中，谁的值大，把下标给 largest
    let largest =
      left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
    // 父和较大的孩子比，谁的值大，把下标给 largest
    largest = arr[largest] > arr[i] ? largest : i;
    if (largest === i) {
      break;
    }

    swap(arr, largest, i);
    i = largest;
    left = 2 * i + 1;
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// const { comparator } = require("./utils");
// comparator(heapSort);

/**
 * 堆排序扩展题目
 *
 * 已知一个几乎有序的数组，几乎有序是指，如果把数组排好顺序的话，每个元素移动的距离可以不超过 k
 * 并且 k 相对于数组来说比较小。请选择一个合适的排序算法针对这个数据进行排序。
 */

function sortArrayDistanceLessK(arr) {}
