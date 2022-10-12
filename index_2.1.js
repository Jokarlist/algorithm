/**
 * 归并排序
 * 1、整体就是一个简单递归，左边排好序，右边排好序，让其整体有序；
 * 2、让其整体有序的过程里用了排外序方法；
 * 3、利用 Master 公式来求解时间复杂度；
 * 4、归并排序的实质。
 */

/**
 * 时间复杂度 O(nlogn) 通过 Master 公式 T(n) = 2T(n/2) + O(n^2) 求出
 * 额外空间复杂度 O(n)
 * @param {number[]} arr 待排序的数组
 */
const mergeSort = function (arr) {
  if (!arr || arr.length < 2) {
    return;
  }

  proc(arr, 0, arr.length - 1);

  return arr;
};

/**
 * 将数组在指定的起止点上排好序
 * @param {number[]} arr 待排序的数组
 * @param {number} left 数组的起始点
 * @param {number} right 数组的终止点
 */
const proc = function (arr, left, right) {
  if (left === right) {
    return;
  }

  const mid = left + ((right - left) >> 1);
  proc(arr, left, mid);
  proc(arr, mid + 1, right);
  merge(arr, left, mid, right);
};

/**
 * 将两部分分别已排序的数组合并成一个已排序的数组
 * @param {number[]} arr 待排序的数组
 * @param {number} left 数组的起始点
 * @param {number} mid 数组的中点
 * @param {number} right 数组的终止点
 */
const merge = function (arr, left, mid, right) {
  const temp = new Array(right - left + 1);
  let lPtr = left;
  let rPtr = mid + 1;
  let i = 0;
  // 左指针未越界且右指针未越界的情况
  while (lPtr <= mid && rPtr <= right) {
    // 左指针指示的值小于等于右指针指示的值时，或左指针指示的值小于右指针指示的值时
    // 将相应的值复制到临时数组中去
    temp[i++] = arr[lPtr] <= arr[rPtr] ? arr[lPtr++] : arr[rPtr++];
  }
  // 右指针越界的情况
  while (lPtr <= mid) {
    // 将左指针指向的值以及后续剩下的全部复制到数组中去
    temp[i++] = arr[lPtr++];
  }
  // 左指针越界的情况
  while (rPtr <= right) {
    // 将右指针指向的值以及后续剩下的全部复制到数组中去
    temp[i++] = arr[rPtr++];
  }
  // 将排序好的临时数组遍历复制到原数组中去替换原来的值
  for (i = 0; i < temp.length; i++) {
    arr[left + i] = temp[i];
  }
};

const { comparator } = require("./utils");
comparator(mergeSort);

/**
 * 归并排序的扩展
 */

/**
 * 小和问题：在一个数组中，每一个数左边比当前数小的数累加起来，叫做这个数组的小和
 * 例如：
 * [1,3,4,2,5]：
 * 1 左边比 1 小的数，没有；
 * 3 左边比 3 小的数，有 1；
 * 4 左边比 4 小的数，有 1、3；
 * 2 左边比 2 小的数，有 1；
 * 5 左边比 5 小的数，有 1、3、4、2
 * 所以小和为 1+1+3+1+1+3+4+2=16
 *
 * 此解法是借用归并排序的思想，在其排序过程中不断累加归并操作中的左组的数的小和，最终
 * 可以求出原数组的小和
 */
const smallSum = function (arr) {
  if (!arr || arr.length < 2) {
    return 0;
  }

  proc1(arr, 0, arr.length - 1);
};

const proc1 = function (arr, left, right) {
  if (left === right) {
    return 0;
  }

  const mid = left + ((right - left) >> 1);
  return (
    proc1(arr, left, mid) +
    proc1(arr, mid + 1, right) +
    merge1(arr, left, mid, right)
  );
};

const merge1 = function (arr, left, mid, right) {
  const temp = new Array(right - left + 1);
  let lPtr = left;
  let rPtr = right;
  let sum = 0;
  let i = 0;
  while (lPtr <= mid && rPtr <= right) {
    // 左指针指向的数小于右指针指向的数时，通过右组的下标计算便可得知有多少个数大于左指针
    // 指向的数，便可计算出其对应的小和
    sum += arr[lPtr] < arr[rPtr] ? arr[lPtr] * (right - rPtr + 1) : 0;
    // 与归并排序的细微差别在此；只有当左指针指向的数严格小于右指针指向的数时才将前者
    // 复制到外排序的数组中去，也只有这样右指针才能移动到第一个小于等于左指针的位置
    // 才能依靠下标计算得出有多少个数大于左指针指向的数
    temp[i++] = arr[lPtr] < arr[rPtr] ? arr[lPtr++] : arr[rPtr++];
  }

  while (lPtr <= mid) {
    temp[i++] = arr[lPtr++];
  }

  while (rPtr <= right) {
    temp[i++] = arr[rPtr++];
  }

  for (i = 0; i < temp.length; i++) {
    arr[left + i] = temp[i];
  }

  return sum;
};

/**
 * 逆序对问题
 * 在一个数组中，左边的数如果比右边的数大，则这两个数构成一个逆序对，请打印所有逆序对。
 */
const reversePair = function (arr) {
  if (!arr || arr.length < 2) {
    return 0;
  }

  return proc2(arr, 0, arr.length - 1);
};

const proc2 = function (arr, left, right) {
  if (left === right) {
    return 0;
  }

  const mid = left + ((right - left) >> 1);
  return (
    proc2(arr, left, mid) +
    proc2(arr, mid + 1, right) +
    merge2(arr, left, mid, right)
  );
};

const merge2 = function (arr, left, mid, right) {
  const temp = new Array(right - left + 1);
  let lPtr = left;
  let rPtr = mid + 1;
  let i = 0;
  let sum = 0;
  while (lPtr <= mid && rPtr <= right) {
    // arr[lPtr] > arr[rPtr] && console.log(`(${arr[lPtr]}, ${arr[rPtr]})`);
    sum += arr[lPtr] > arr[rPtr] ? right - rPtr + 1 : 0;
    temp[i++] = arr[lPtr] > arr[rPtr] ? arr[lPtr++] : arr[rPtr++];
  }

  while (lPtr <= mid) {
    temp[i++] = arr[lPtr++];
  }

  while (rPtr <= right) {
    temp[i++] = arr[rPtr++];
  }

  for (i = 0; i < temp.length; i++) {
    arr[left + i] = temp[i];
  }

  return sum;
};

// const arr = [5, 4, 3, 2, 1];
// const sum = reversePair(arr);
// console.log(arr, sum);
