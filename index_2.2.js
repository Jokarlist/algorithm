/**
 * 快速排序
 *
 * 不改进的快速排序：
 * 1、把数组范围中的最后一个数作为划分值，然后把数组通过荷兰国旗问题分成三个部分：
 * 左侧小于划分值区域、中间等于划分值区域、右侧大于划分值区域。
 * 2、对左侧范围和右侧范围，递归执行。
 *
 * 分析：
 * 1、划分值越靠近两侧，复杂度越高，划分值越靠近中间，复杂度越低。划分值正好在中间时，用 Master
 * 公式得出时间复杂度为 O(nlogn)，则划分值越偏则时间复杂度越接近 O(n^2)。
 * 2、可以轻而易举的举出最差的例子，所以不改进的快速排序时间复杂度为 O(n^2)。
 *
 * 随机快速排序（改进的快速排序）：
 * 1、在数组范围中，等概率随机选一个数作为划分值，然后把数组通过荷兰国旗问题分成三个部分：
 * 左侧小于划分值区域、中间等于划分值区域、右侧大于划分值区域。
 * 2、对左侧范围和右侧范围，递归执行。
 * 3、时间复杂度为 O(nlogn)。
 *
 * 分析：
 * 因为划分值是随机去选的，所以划分值的好坏是一个等概率事件，用 Master 公式求出所有划分值的情况
 * 所对应的时间复杂度，然后求数学期望（数学证明较复杂，基本思想如此），最终得到 O(nlogn)。
 */

/**
 * 快速排序
 * 时间复杂度 O(nlogn)，最差 O(n^2)
 * 额外空间复杂度 O(logn)，最差 O(n)
 * @param {number[]} arr 待排序的数组
 */
function quickSort(arr) {
  if (!arr || arr.length < 2) {
    return;
  }

  proc(arr, 0, arr.length - 1);

  return arr;
}

// 将 arr[l~r] 排好序
function proc(arr, l, r) {
  if (l < r) {
    swap(arr, l + Math.floor(Math.random() * (r - l + 1)), r);
    const p = partition(arr, l, r);
    proc(arr, l, p[0] - 1);
    proc(arr, p[1] + 1, r);
  }
}

// 处理 arr[l~r] 的函数
// 默认以数组最后一个元素 arr[r] 作为划分，arr[r] => p，分为小于p、等于p、大于p的区域
// 返回指示等于区域的边界的数组 [左边界，右边界]
function partition(arr, l, r) {
  // 小于区域的右边界
  let less = l - 1;
  // 大于区域的左边界
  let more = r;
  while (l < more) {
    // l 表示当前数的位置，arr[r] => 划分值
    if (arr[l] < arr[r]) {
      // 当前数小于划分值
      // 当前数和小于区域的后一个数交换，小于区域右扩，当前数指针右移
      swap(arr, ++less, l++);
    } else if (arr[l] > arr[r]) {
      // 当前数大于划分值
      // 当前数和大于区域的前一个数交换，大于区域左扩，当前数指针不移动
      // 因为不知道换过来的数和划分值的大小关系如何
      swap(arr, --more, l);
    } else {
      // 当前数等于划分值
      // 当前数指针直接右移
      l++;
    }
  }

  // 当前数指针与大于区域的左边界指针碰撞，将划分值交换大于区域的左边界，作为等于区域的最后一个值
  swap(arr, more, r);
  // 返回指示等于区域的左右边界数组
  return [less + 1, more];
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const { comparator } = require("./utils");
comparator(quickSort);
